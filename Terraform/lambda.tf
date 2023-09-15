
resource "aws_lambda_layer_version" "lambda_layer" {
  filename   = var.lambda_layer_zip
  layer_name = "${var.project_name}-wkhtmltox-layer"

  compatible_runtimes = ["python3.9"]
}

resource "aws_lambda_function" "lambda" {
  filename         = var.lambda_file_zip
  function_name    = "${var.project_name}-lambda"
  role             = aws_iam_role.iam_for_lambda.arn
  handler          = "lambda_function.lambda_handler"
  publish          = true
  source_code_hash = filebase64sha256(var.lambda_file_zip)
  runtime          = "python3.9"
  timeout          = 900
  layers           = [aws_lambda_layer_version.lambda_layer.arn]

  environment {
    variables = {
      bucket_name = "${var.project_name}${random_string.random.id}"
    }
  }

}

resource "aws_lambda_permission" "allow_apigw" {
  statement_id  = "AllowExecutionFromAPIGW"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.apigw.execution_arn}/*/*/api/v1/convert"
}