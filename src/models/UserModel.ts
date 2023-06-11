import mongoose from "mongoose";

interface IUserModelSchema {
  name: string;
  email: string;
  passwordHash: string;
  savedCocktailIds: number[];
}

const UserModelSchema = new mongoose.Schema<IUserModelSchema>({
  name: String,
  email: String,
  passwordHash: String,
  savedCocktailIds: Array,
});

const UserModel =
  (mongoose.models.User as mongoose.Model<IUserModelSchema>) ||
  mongoose.model("User", UserModelSchema);

export default UserModel;
