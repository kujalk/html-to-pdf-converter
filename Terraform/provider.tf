provider "aws" {
  region                   = "ap-southeast-1"
}

terraform {
  backend "s3" {
    bucket = "gitactiontf"
    key    = "gittfstate"
    region = "ap-southeast-1"
  }
}