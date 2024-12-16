using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Weibo.Db.Models;

[Table("user")]
public partial class User
{
  [Key]
  [Column("uid")]
  public int Uid { get; set; }

  [Column("nickname")]
  public string? Nickname { get; set; }

  [Column("avatar")]
  public string? Avatar { get; set; }

  [Column("gender")]
  public string? Gender { get; set; }

  [Column("location")]
  public string? Location { get; set; }

  [Column("verified_reason")]
  public string? VerifiedReason { get; set; }

  [Column("description")]
  public string? Description { get; set; }

  [Column("raw")]
  public string? Raw { get; set; }

  [Column("created_at", TypeName = "datetime")]
  public DateTime? CreatedAt { get; set; }

  [Column("updated_at", TypeName = "datetime")]
  public DateTime? UpdatedAt { get; set; }

  [InverseProperty("UidNavigation")]
  public virtual ICollection<Mblog> Mblogs { get; set; } = new List<Mblog>();
}
