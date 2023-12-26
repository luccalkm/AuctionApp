FROM mcr.microsoft.com/dotnet/sdk:7.0 as build

WORKDIR /app

EXPOSE 80

# Copy every csproj and restore as distinct layers
COPY BidWheels.sln BidWheels.sln
COPY src/AuctionService/AuctionService.csproj src/AuctionService/AuctionService.csproj
COPY src/Contracts/Contracts.csproj src/Contracts/Contracts.csproj
COPY src/GatewayService/GatewayService.csproj src/GatewayService/GatewayService.csproj
COPY src/IdentityService/IdentityService.csproj src/IdentityService/IdentityService.csproj
COPY src/SearchService/SearchService.csproj src/SearchService/SearchService.csproj

RUN dotnet restore BidWheels.sln

# Copy app folders
COPY src/GatewayService src/GatewayService

WORKDIR /app/src/GatewayService/
RUN dotnet publish -c Release -o /app/src/out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0 as runtime
WORKDIR /app
COPY --from=build /app/src/out ./
ENTRYPOINT ["dotnet", "GatewayService.dll"]