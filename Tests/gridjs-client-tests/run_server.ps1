$MyDir = [System.IO.Path]::GetDirectoryName($myInvocation.MyCommand.Definition)
cd $MyDir/../../Examples_GridJs
Set-Item -Path Env:ASPNETCORE_ENVIRONMENT -Value ($Env:ASPNETCORE_ENVIRONMENT + ";Development")
dotnet run --environment UiIntegrationTesting