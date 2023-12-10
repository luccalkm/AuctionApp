﻿using AuctionService.Data;
using AuctionService.Entities;
using Contracts;
using MassTransit;

namespace AuctionService.Consumers;

public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
{
    private readonly AuctionDbContext _dbContext;

    public AuctionFinishedConsumer(AuctionDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Consume(ConsumeContext<AuctionFinished> context)
    {
        var auction = await _dbContext.Auctions.FindAsync(context.Message.AuctionId);

        if(context.Message.ItemSold)
        {
            auction.Winner = context.Message.Winner;
            auction.SoldAmmount = context.Message.Amount.Value;
        }

        auction.Status = auction.SoldAmmount > auction.ReservePrice 
            ? Status.Finished : Status.ReserveNotMet;

        await _dbContext.SaveChangesAsync();
    }
}
