using MassTransit;
using SearchService.Consumers;
using SearchService.Data;
using SearchService.Services;

var builder = WebApplication.CreateBuilder(args);

// LOAD ENV FILE INFO
DotNetEnv.Env.Load(@"..\.env");
var server = Environment.GetEnvironmentVariable("IP");

builder.Services.AddControllers();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddHttpClient<AuctionServiceHttpClient>();
builder.Services.AddMassTransit(x =>
{
    x.AddConsumersFromNamespaceContaining<AuctionCreatedConsumer>();
    x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("search", false));
    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host(server, "/", h =>
        {
            h.Username("guest");
            h.Password("guest");
        });
        cfg.ConfigureEndpoints(context);
    });
});

var app = builder.Build();

app.UseAuthorization();
app.MapControllers();

try
{
	await DbInitializer.InitDb(app);
}
catch (Exception e)
{
    Console.WriteLine(e);
}

app.Run();