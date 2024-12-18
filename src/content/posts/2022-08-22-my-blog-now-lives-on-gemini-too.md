---
title: My blog now lives on Gemini, too
slug: my-blog-now-lives-on-gemini-too
date: 2022-08-23T02:35:15.000Z
---
<p><em>If you're already on Gemini, you can <a href="gemini://kesdev.com">visit my blog on Gemini</a> right now!</em></p><p><a href="https://gemini.circumlunar.space/">Project Gemini</a> (<a href="gemini://gemini.circumlunar.space/">Gemini link</a>) is an exciting new project! It aims to bring together some of the best parts of Gopher and the web:</p><ul><li>Content-focused: no JavaScript, no pop-ups, no <em>images</em></li><li>Privacy-oriented: no cookies, no non-consensual tracking</li><li>Mandatory TLS, with <em>client certificate support </em>for identity management</li></ul><p>The <a href="https://gemini.circumlunar.space/docs/specification.gmi">specification</a> (<a href="gemini://gemini.circumlunar.space/docs/specification.gmi">Gemini link</a>) is rather small for a web protocol at only ~5200 words. I found the spec easy to read and understand. It declares an extremely basic content format which sort of looks like a stripped-down version of Markdown.</p><p>I'm always excited for new global communication technologies, and Gemini seems like a friendlier version of the Internet – one where Facebook pixels aren't threatening to aggregate our activity at every turn. So I wanted to start hosting some interesting projects on Gemini, starting with this blog.</p><h1 id="approach">Approach</h1><p>The approach I took was to host my content on <a href="https://ghost.org/">Ghost</a>, my favorite lightweight blog platform which runs on Node and features an excellent WYSIWYG CMS. Ghost provides a <a href="https://ghost.org/docs/content-api/">Content API</a> which exposes all of my blog's content and its metadata. I wrote an application called <a href="https://github.com/mplewis/ghostini">Ghostini</a> to read data from that API and serve it. I used the <a href="https://github.com/LukeEmmet/html2gemini">html2gemini</a> library to convert from my Ghost HTML to Gemini text.</p><p>I host my Ghost blog inside my personal Kubernetes cluster, which runs on <a href="https://www.digitalocean.com/products/kubernetes">DigitalOcean</a>. Traffic enters my cluster via a DigitalOcean Load Balancer, and I route it using <a href="https://traefik.io/solutions/kubernetes-ingress/">Traefik</a> to handle my Kubernetes ingress.</p><h1 id="routing">Routing</h1><p>Most of my apps are HTTP/REST apps, which Traefik and Kubernetes handle as first-party citizens. This means they can natively and easily route requests to the right host by reading the <code>Host</code> HTTP header. However, Gemini doesn't use HTTP headers, or any headers at all. A Gemini request contains only the URL and looks like this:</p><pre><code>gemini://kesdev.com/&lt;CR&gt;&lt;LF&gt;</code></pre><p>To use Gemini properly, the Gemini server must terminate the TLS connection. This allows it to read the client certificate, which it needs if it wants to do anything with the client's identity. This means that we can't MITM the TLS connection, by having Traefik terminate and restarting it, without losing the client identity. We have to do <a href="https://www.parallels.com/blogs/ras/ssl-passthrough/">TLS passthrough</a>, forwarding the encrypted connection directly to the Gemini server without reading it.</p><p>But if we can't read the message, we can't see the absolute hostname inside and know that this request is for <code>kesdev.com</code>. So we have to take advantage of the TLS extension called <a href="https://www.wikiwand.com/en/Server_Name_Indication">Server Name Indication</a> (SNI). Compatible clients can send the name of their target host (the Server Name) at the TLS <code>ClientHello</code> step, which we're able to read before continuing with TLS negotiation. This lets our Traefik TCP router understand where this request should go and route it there without terminating TLS.</p><p>I'm lightly familiar with TLS, but learning enough of this to make this work with my k8s + Traefik setup took me three entire days of work. So I'd like to share a basic configuration that I wish I had had when I was starting this endeavor.</p><h1 id="configuration">Configuration</h1><p>My cluster uses Traefik 2.6.1. Below is a Kubernetes manifest which does the following:</p><ul><li>starts an <code>nginx</code> deployment and service in your cluster</li><li>configures nginx to listen on port 443 and terminate TLS using a <code>localhost</code> certificate</li><li>configures Traefik to route requests on the <code>websecure</code> <a href="https://doc.traefik.io/traefik/routing/entrypoints/">entrypoint</a> for <code>localhost</code> and <code>example.com</code> to the <code>nginx</code> service using an <a href="https://doc.traefik.io/traefik/routing/providers/kubernetes-crd/#kind-ingressroutetcp">IngressRouteTCP</a> with <a href="https://doc.traefik.io/traefik/routing/routers/#passthrough">TLS passthrough</a> enabled</li></ul><p>This should be enough to get you to a point where you can port-forward into your <code>traefik</code> service on the <code>websecure</code> port. Then you should be able to visit <a href="https://localhost:1443">https://localhost:1443</a> to see a valid TLS connection (with a self-signed cert).</p><h2 id="verification">Verification</h2><p>Here's how I tested this using kubectl and <a href="https://httpie.io/">httpie</a>:</p><pre><code class="language-sh">kubectl apply -f nginx.yaml
kubectl port-forward service/traefik 1443:443
https get localhost:1443 --verify=no</code></pre><p>You can verify that Traefik is routing TCP with passthrough, not offloading, by visiting in your browser and checking that the server certificate signature in your browser matches the SHA256 signature for the certificate in the configmap:</p><figure class="kg-card kg-image-card"><img src="/ghost-images/content/images/2022/08/image.png" class="kg-image" alt="Screenshot of my Firefox server certificate inspector, showing that the SHA-256 fingerprint matches the expected fingerprint for nginx TLS termination" loading="lazy" width="840" height="1143"></figure><pre><code>B1:71:61:6F:A9:62:44:4C:78:84:B0:A9:4D:6C:AB:51:4E:8B:EC:AB:06:A8:7C:F3:FC:C4:63:EE:71:1D:9E:A9</code></pre><h2 id="kubernetes-manifest">Kubernetes manifest</h2><pre><code class="language-yaml">apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
  labels:
    app: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      volumes:
        - name: nginx-configs
          configMap:
            name: nginx-configs
        - name: nginx-certs
          configMap:
            name: nginx-certs
      containers:
        - name: nginx
          image: nginx:latest
          ports:
            - name: https
              containerPort: 443
          volumeMounts:
            - name: nginx-configs
              mountPath: /etc/nginx/conf.d
            - name: nginx-certs
              mountPath: /tmp/certs

---
apiVersion: v1
kind: Service
metadata:
  name: nginx
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 443
      targetPort: 443

---
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRouteTCP
metadata:
  name: nginx
spec:
  entryPoints:
    - websecure
  tls:
    passthrough: true
  routes:
    - match: HostSNI(`localhost`)
      services:
        - name: nginx
          port: 443

---
apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-certs
data:
  # openssl x509 -noout -fingerprint -sha256 -inform pem -in localhost.crt
  # SHA256 Fingerprint=B1:71:61:6F:A9:62:44:4C:78:84:B0:A9:4D:6C:AB:51:4E:8B:EC:AB:06:A8:7C:F3:FC:C4:63:EE:71:1D:9E:A9
  localhost.crt: |
    -----BEGIN CERTIFICATE-----
    MIIBSzCB8qADAgECAhEAxReivp6Xurv1VFFia/KbrTAKBggqhkjOPQQDAjAUMRIw
    EAYDVQQDEwlsb2NhbGhvc3QwHhcNMjIwMjAzMDUyODQ3WhcNMzIwMjAzMDUyODQ3
    WjAUMRIwEAYDVQQDEwlsb2NhbGhvc3QwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNC
    AARtJ3ZPKaPpmyUz4Lt5r7UgDUsa5vjiDKQeh3UX0DIlIKywO1S5k0IUrnFOlrdf
    RLmBK4BqpEi8IMAHOGhwwQ5WoyUwIzAhBgNVHREEGjAYgglsb2NhbGhvc3SCCyou
    bG9jYWxob3N0MAoGCCqGSM49BAMCA0gAMEUCIGTSuMSaShxZ4HQLnN7cQz+s/vG5
    uyTmMI0WZL+MDLsoAiEA/TYIzjxzbFVPkU8+uD2TXlidlk1kib+eGcZ45DObPc0=
    -----END CERTIFICATE-----
  localhost.key: |
    -----BEGIN PRIVATE KEY-----
    MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQglzpLGw4kdm8tCuoe
    LgmkatGPo7p0DXgy4szovoYEswChRANCAARtJ3ZPKaPpmyUz4Lt5r7UgDUsa5vji
    DKQeh3UX0DIlIKywO1S5k0IUrnFOlrdfRLmBK4BqpEi8IMAHOGhwwQ5W
    -----END PRIVATE KEY-----

---
apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-configs
data:
  https-only.conf: |
    server {
        listen 443 ssl http2;
        ssl_certificate /tmp/certs/localhost.crt;
        ssl_certificate_key /tmp/certs/localhost.key;

        server_name  localhost;

        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /usr/share/nginx/html;
        }
    }</code></pre><h1 id="conclusion">Conclusion</h1><p>I spent a long time trying to get this to work because I wanted the ability to host Gemini apps in my Kubernetes cluster. I'm very happy to have it working, and I hope that what I've learned saves you some time if you try this for yourself! I look forward to hosting more public Gemini apps.</p>
