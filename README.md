# This project includes exercises and notes for Express.js

---

## Notes

### Initializing a project

There is no Vite.js for express.js project the project must be initialized manually.

```bash
npm init -y
```

Then install Express.js:

```bash
npm i express
```

To run the server on watch mode:

```bash
npm i -D nodemon
```

"-D" means "developer dependency". Also we can use:

```bash
node --watch server.js
```

It does the same thing but nodemon can be customizised

### Deploying on Vercel

✅ At this point you have an Express.js app running on Vercel.
The main difference from a normal server: you don’t call app.listen(). Vercel handles that by turning your app into a serverless function.
