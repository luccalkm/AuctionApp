using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class AuctionUpdatedConsumer : IConsumer<AuctionUpdated>
{
    private readonly IMapper _mapper;

    public AuctionUpdatedConsumer(IMapper mapper)
    {
        _mapper = mapper;
    }

    public async Task Consume(ConsumeContext<AuctionUpdated> context)
    {
        var item = _mapper.Map<Item>(context.Message);

        await DB.Update<Item>()
            .Match(a => a.ID == context.Message.Id)
            .ModifyOnly(b =>
            new
            {             
                b.Make,
                b.Model,
                b.Year,
                b.Color,
                b.Mileage,
            }, item)
            .ExecuteAsync();
    }
}
