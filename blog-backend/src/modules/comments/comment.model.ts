import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database";
import Post from "../posts/post.model";

class Comment extends Model {
  public id!: number;
  public postId!: number;
  public author!: string;
  public content!: string;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Post,
        key: "id",
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Anonymous",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "comments",
  }
);


Post.hasMany(Comment, { foreignKey: "postId", as: "comments" });
Comment.belongsTo(Post, { foreignKey: "postId", as: "post" });

export default Comment;