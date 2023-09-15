output "website-endpoint" {
  value = aws_s3_bucket_website_configuration.web.website_endpoint
}

output "website-bucket" {
  value = var.front_end_bucket
}

output "api-gw" {
  value = aws_apigatewayv2_stage.apigw.invoke_url
}

output "pdf-storage-bucket" {
  value = aws_s3_bucket.pdfstorage.bucket_domain_name
}