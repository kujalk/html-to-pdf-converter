// Bucket for Front end
resource "aws_s3_bucket" "frontend" {
  bucket        = var.front_end_bucket
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "public-block" {
  bucket = aws_s3_bucket.frontend.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false

}

resource "aws_s3_bucket_policy" "prod_website" {
  bucket     = aws_s3_bucket.frontend.id
  depends_on = [aws_s3_bucket_public_access_block.public-block]
  policy     = <<POLICY
{    
    "Version": "2012-10-17",    
    "Statement": 
    [ 
        {
            "Sid": "Read-access",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::${aws_s3_bucket.frontend.id}/*"
        }
    ]
}
POLICY
}

// Bucket for PDF Storage

resource "random_string" "random" {
  length  = 8
  numeric = false
  special = false
  lower   = true
  upper   = false
}

resource "aws_s3_bucket" "pdfstorage" {
  bucket        = "${var.project_name}${random_string.random.id}"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "public-block-pdf" {
  bucket = aws_s3_bucket.pdfstorage.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false

}

resource "aws_s3_bucket_policy" "pdfstorage" {
  bucket     = aws_s3_bucket.pdfstorage.id
  depends_on = [aws_s3_bucket_public_access_block.public-block-pdf]
  policy     = <<POLICY
{    
    "Version": "2012-10-17",    
    "Statement": 
    [ 
        {
            "Sid": "Read-access",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": [
              "arn:aws:s3:::${aws_s3_bucket.pdfstorage.id}/*",
              "arn:aws:s3:::${aws_s3_bucket.pdfstorage.id}"
            ]
        }
    ]
}
POLICY
}

resource "aws_s3_bucket_website_configuration" "web" {
  bucket = aws_s3_bucket.frontend.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}