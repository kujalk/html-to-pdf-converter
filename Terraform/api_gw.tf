resource "aws_apigatewayv2_api" "apigw" {
  name          = "${var.project_name}-http-endpoint"
  protocol_type = "HTTP"

  cors_configuration {
    allow_headers = ["*"]
    allow_methods = ["POST", "OPTIONS"]
    allow_origins = ["*"]
  }
}


resource "aws_apigatewayv2_integration" "apigw" {
  api_id           = aws_apigatewayv2_api.apigw.id
  integration_type = "AWS_PROXY"
  connection_type = "INTERNET"
  description        = "${var.project_name} http lambda integration"
  integration_method = "POST"
  integration_uri    = aws_lambda_function.lambda.invoke_arn
}

resource "aws_apigatewayv2_route" "apigw" {
  api_id    = aws_apigatewayv2_api.apigw.id
  route_key = "POST /api/v1/convert"

  target = "integrations/${aws_apigatewayv2_integration.apigw.id}"
}

resource "aws_apigatewayv2_stage" "apigw" {
  api_id      = aws_apigatewayv2_api.apigw.id
  name        = var.apigw_stage
  auto_deploy = true
}