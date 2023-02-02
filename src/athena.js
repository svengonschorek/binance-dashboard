"use strict";

const AthenaExpress = require("athena-express"),
    AWS = require("aws-sdk"),
    awsCredentials = {
        region: process.env.region,
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey
    }

AWS.config.update(awsCredentials)

const athenaExpressConfig = {
    aws: AWS,
    s3: "s3://bihh-athena-results/athena-express",
    getStats: true
}

const athenaExpress = new AthenaExpress(athenaExpressConfig);

export async function getAssetAmounts(ts) {

    let myQuery = {
        sql: `
            select
                asset,
                round(amount_eur, 2) as amount_eur
            from raw_data.daily_wallet_export
            where cast(
                from_unixtime(cast(ts/1000 AS bigint)) as date
            ) = cast(substring('${ts}', 1, 10) as date)
            and amount_eur >= 0.1
        `,
        db: "raw_data",
        pagination: 100
    }

    let data = [];
    response = await athenaExpress.query(myQuery);
    for (var i = 0; i < response.Items.length; i++) {
        data.push(response.Items[i])
    }

    return data

}

export async function getWalletAmount() {
    let myQuery = {
        sql: `
            select
                cast(from_unixtime(cast(ts/1000 AS bigint)) as date) as balance_on,
                round(sum(amount_eur), 2) as amount_eur
            from raw_data.daily_wallet_export
            group by ts
            order by ts
        `,
        db: "raw_data",
        pagination: 100
    }

    let data = [];
    response = await athenaExpress.query(myQuery);
    for (var i = 0; i < response.Items.length; i++) {
        data.push(response.Items[i])
    }

    while(response.NextToken) {
        myQuery.NextToken = response.NextToken;
        myQuery.QueryExecutionId = response.QueryExecutionId;
        response = await athenaExpress.query(myQuery);
        for (var i = 0; i < response.Itemslength; i++) {
            data.push(response.Items[i])
        }
    }

    return data

}
