import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database";

class Post extends Model {
    public id!: number;
    public title!: string;
    public content!: string;
    public author!: string;
}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Anonymous",
        },
    },
    {
        sequelize,
        tableName: "posts"
    }
);
export default Post;