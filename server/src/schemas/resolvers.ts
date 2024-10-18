import { Book, User } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

interface AddUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  };
}

interface LoginUserArgs {
    email: string;
    password: string;
  }

  interface UserArgs {
    username: string;
  }

  interface BookArgs {
    bookId: string;
  }

interface AddBookArgs {
 input: {
    authors: string[];
    description: string;
    title: string;
    bookId: string;
    image: string;
    link: string;
 }
}

interface SearchBookArgs {
  searchInput: string;
}

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('savedBooks');
    },

    user: async (_parent: any, { username }: UserArgs) => {
      return User.findOne({ username }).populate('savedBooks');
    },

    books: async () => {
      return await Book.find().sort({ createdAt: -1 });
    },

    book: async (_parent: any, { bookId }: BookArgs) => {
      return Book.findOne({ bookId });
    },

    searchBooks: async (_parent: any, { searchInput }: SearchBookArgs) => {
      const books = await Book.find({
        $or: [
          { title: { $regex: searchInput, $options: 'i' } },
          { authors: { $regex: searchInput, $options: 'i' } },
          { description: { $regex: searchInput, $options: 'i' } },
        ],
      });

      if (!books) {
        throw new Error('Cannot find any books');
      }
      return books;
    },

    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedBooks');
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      const user = await User.create({ ...input });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user.name, user.email, user._id);
      return { token, user };
    },
    addBook: async (_parent: any, { input }: AddBookArgs, context: any) => {
      if (context.user) {
        const existingBook = await Book.findOne({ bookId: input.bookId });
        const book = existingBook || await Book.create({ ...input });

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: book._id } },
          { new: true }
        ).populate('savedBooks');

        return updatedUser;
      }
      throw AuthenticationError;
    },

    removeBook: async (_parent: any {bookId}: BookArgs, context:any) => {
      if (context.user) {
        const bookToRemove = await Book.findOne({ bookId });
      
        if (!bookToRemove) {
      throw AuthenticationError;
    }

   const updatedUser = await User.findOneAndUpdate(
      { _id: context.user._id },
      { $pull: { savedBooks: bookToRemove._id } },
      { new: true }
    ).populate('savedBooks');

    return updatedUser;
  }
  throw AuthenticationError;
},
  },
};

export default resolvers;
