import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import * as dotenv from "dotenv"

dotenv.config()
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
  //  this created the layer that we zip with docker
    const layer = new lambda.LayerVersion(this, "BaseLayer", {
      code: lambda.Code.fromAsset("lambda_base_layer/layer.zip"),
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_9],
    })
//this import the api into lambda
    const apiLambda = new lambda.Function(this, "ApiFunction", {
      runtime: lambda.Runtime.PYTHON_3_9,
      code: lambda.Code.fromAsset("../backend/"),
      handler: "fast_api.handler",
      layers: [layer],
      environment: {
        OPENAI_API_KEY2: process.env.OPENAI_API_KEY2 ?? "",
      },
    })

    const consciousApi = new apiGateway.RestApi(this, "RestApi", {
      restApiName: "Conscious_API",
    });

    consciousApi.root.addProxy({
      defaultIntegration: new apiGateway.LambdaIntegration(apiLambda)

    });
    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'InfraQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}