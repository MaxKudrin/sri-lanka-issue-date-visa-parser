# Issue Date Sri Lanka visa parser

## Installation Guide

### Copy repository

### Make sure that you have node js installed

```bash
node -v
```

### Create .env file as per example and rename file

```bash
rename file:
.env.example > .env
```

### Install all dependencies

```bash
npm install
```

### For start file please use **passports.txt** as per example below

```bash
QW121212
AS121212
ZX121212
```

### Output file is **data.txt** file with following markup

```bash
QW121212 01/01/2022
AS121212 01/01/2022
ZX121212 null
```

### Run app

```bash
npm run start
```
