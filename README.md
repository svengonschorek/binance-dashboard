# binance-dashboard
Chart.js Binance Crypto Dashboard using Athena data

# Getting started
Before getting started, you need to setup a daily export of your wallet into Athena.

To do this, check out my other repository "binance_wallet_export". After your export is set up, you can use this code to visualize the data.

You can start the dashboard locally using:
```
npm run dev
```

The dashboad will be displayed on localhost:1234

# Environment variables
athena.js needs the environment variables from your aws account
    - region
    - accessKeyId
    - secretAccessKey
