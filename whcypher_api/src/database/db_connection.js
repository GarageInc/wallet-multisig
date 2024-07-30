import mongoose from 'mongoose';

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

export const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, options);
};
