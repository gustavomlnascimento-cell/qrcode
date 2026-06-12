# Site surpresa romântico

Uma página interativa para aniversário e Dia dos Namorados, pensada para abrir
direto no celular por meio de um QR code.

## Personalizar

1. Abra `script.js`.
2. Edite o objeto `CONFIG` no começo do arquivo:
   - nomes;
   - data do início do relacionamento;
   - textos da carta e da história;
   - motivos;
   - legendas das fotos.
3. Crie a pasta `assets` e adicione as fotos com os nomes `foto-1.jpg` até
   `foto-5.jpg`.
4. Para música, coloque um MP3 na pasta `assets` e altere:

```js
musica: "assets/nossa-musica.mp3",
```

Sem música configurada, o botão de áudio fica oculto.

## Testar no computador

Execute:

```bash
python3 -m http.server 8000
```

Depois abra `http://localhost:8000`.

## Publicar e criar o QR code

### GitHub Pages

1. Envie os arquivos para um repositório no GitHub.
2. Em **Settings > Pages**, selecione **Deploy from a branch**.
3. Escolha a branch `main` e a pasta `/ (root)`.
4. Aguarde o GitHub fornecer uma URL pública.

### QR code

Use a URL pública do site em qualquer gerador de QR code. Antes de imprimir,
teste o QR code com outro celular e confirme que o endereço começa com `https://`.
