FROM denoland/deno:latest
WORKDIR /app

COPY . .

RUN deno cache main.ts

CMD ["deno", "run", "--allow-net", "--allow-write", "--allow-read", "--allow-sys", "--allow-env", "main.ts"]