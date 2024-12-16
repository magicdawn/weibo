using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Weibo.Db.Models;

namespace Weibo.Db.Context;

public partial class WeiboContext : DbContext
{
  public WeiboContext() { }

  public WeiboContext(DbContextOptions<WeiboContext> options)
    : base(options) { }

  public virtual DbSet<AssociateMblog> AssociateMblogs { get; set; }

  public virtual DbSet<Mblog> Mblogs { get; set; }

  public virtual DbSet<User> Users { get; set; }

  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
    =>
    optionsBuilder.UseSqlite("Data Source=../data/weibo.db");

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<AssociateMblog>(entity =>
    {
      entity
        .Property(e => e.CreatedAt)
        .HasDefaultValueSql("CURRENT_TIMESTAMP")
        .HasConversion<string>();
      entity
        .Property(e => e.UpdatedAt)
        .HasDefaultValueSql("CURRENT_TIMESTAMP")
        .HasConversion<string>();
    });

    modelBuilder.Entity<Mblog>(entity =>
    {
      entity.Property(e => e.Id).ValueGeneratedNever();
      entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
      entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

      entity
        .HasOne(d => d.UidNavigation)
        .WithMany(p => p.Mblogs)
        .OnDelete(DeleteBehavior.ClientSetNull);
    });

    modelBuilder.Entity<User>(entity =>
    {
      entity.Property(e => e.Uid).ValueGeneratedNever();
      entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
      entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
    });

    OnModelCreatingPartial(modelBuilder);
  }

  partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
