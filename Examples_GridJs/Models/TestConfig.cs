﻿using Amazon;
using Amazon.Runtime;
using Amazon.S3;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aspose.Cells.GridJsDemo.Models
{
    public class TestConfig
    {
        /// <summary>
        /// the directory which contains workbook files
        /// </summary>
       public String ListDir { get; set; } = @"D:\codebase\customerissue\wb\tempfromdownload\";
        /// <summary>
        /// temp directory to store file cache
        /// </summary>
       public String TempDir { get; set; } = @"D:\tmpdel\tmp\";
    }
    public class AwsConfig
    {
        public static RegionEndpoint RegionEndpoint = RegionEndpoint.GetBySystemName("YourRegion");
        public static BasicAWSCredentials Credentials = new BasicAWSCredentials("YourAccessKey", "YourSecretkey");
        public static AmazonS3Client client = new AmazonS3Client(Credentials, RegionEndpoint);
        public static String bucketName = "YourBucketName";
    }
}
