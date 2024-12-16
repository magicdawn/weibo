using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Weibo.Db.Models;

[Table("mblog")]
[Index("IsRepost", Name = "mblog_idx_isRepost")]
[Index("MblogCreatedAt", Name = "mblog_idx_mblogCreatedAt")]
[Index("Uid", Name = "mblog_idx_uid")]
public partial class Mblog
{
  [Key]
  [Column("id")]
  public int Id { get; set; }

  [Column("uid")]
  public int Uid { get; set; }

  [Column("text")]
  public string? Text { get; set; }

  [Column("pic_urls")]
  public string? PicUrls { get; set; }

  [Column("is_repost")]
  public int? IsRepost { get; set; }

  [Column("mblogid")]
  public string? Mblogid { get; set; }

  [Column("raw")]
  public string? Raw { get; set; }

  [Column("mblog_created_at", TypeName = "datetime")]
  public DateTime? MblogCreatedAt { get; set; }

  [Column("created_at", TypeName = "datetime")]
  public DateTime? CreatedAt { get; set; }

  [Column("updated_at", TypeName = "datetime")]
  public DateTime? UpdatedAt { get; set; }

  [ForeignKey("Uid")]
  [InverseProperty("Mblogs")]
  public virtual User UidNavigation { get; set; } = null!;
}
