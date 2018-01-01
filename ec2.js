function launchInstance(accessKeyId, secretAccessKey, region, InstanceType)
{
    var AWS = require('aws-sdk');
    var ec2 = new AWS.EC2();
    ec2.endpoint = "ec2." + region + ".amazonaws.com";
    var config = new AWS.Config(
    {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
        region: region
    });

    var params = {
        ImageId: 'ami-15e9c770',
        InstanceType: InstanceType,
        MinCount: 1,
        MaxCount: 1
    };
    ec2.config = config;

    // Create the instance
    ec2.runInstances(params, function (err, data)
    {
        if (err)
        {
            if (err.code === "NetworkingError")
            {
                console.log("Could not create instance, not a valid region");
            }
            else
            {
                console.log("Could not create instance " + err);
            }
            return;
        }
        var instanceId = data.Instances[0].InstanceId;
        var instanceTime = data.Instances[0].LaunchTime
        var result = "Created instance with ID " + instanceId + " at time " + instanceTime;
        console.log(result);

    });
}

launchInstance(process.argv[2],process.argv[3],process.argv[4],process.argv[5])
