using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Weibo.Db.Models;

[PrimaryKey("Id", "Uid")]
[Table("associate_mblog")]
[Index("IsRepost", Name = "associate_mblog_idx_isRepost")]
[Index("MblogCreatedAt", Name = "associate_mblog_idx_mblogCreatedAt")]
[Index("Uid", Name = "associate_mblog_idx_uid")]
public partial class AssociateMblog
{
  [Key]
  [Column("id")]
  public int Id { get; set; }

  [Key]
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
}
