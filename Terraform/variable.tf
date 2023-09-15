variable "project_name" {
  type        = string
  description = "Project name"
}
variable "front_end_bucket" {
  type        = string
  description = "Frontend S3 Bucket domain name"
}

variable "lambda_file_zip" {
  type        = string
  description = "Lambda file location"
}

variable "lambda_layer_zip" {
  type        = string
  description = "Lambda layer"
}

variable "apigw_stage" {
  type        = string
  description = "API GW Stage"
}