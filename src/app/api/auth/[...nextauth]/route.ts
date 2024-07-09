import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/utils/database";
import { UserModel } from "@/models/user";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback/google",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      // MongoDBに接続
      await connectDB();
      console.log(profile, user);

      // ユーザーが既に存在するか確認
      const existingUser = await UserModel.findOne({ email: user.email });

      if (!existingUser) {
        // 新しいユーザーを作成
        const newUser = new UserModel({
          name: profile?.name,
          email: profile?.email,
          image: user.image || "",
        });
        await newUser.save();
      }

      return true;
    },
    async session({ session, token }) {
      // セッションにユーザー情報を追加
      if (session.user) {
        session.user.email = token.id as string;
        session.user.image = token.image as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.image = user.image;
      }
      return token;
    },
  },
  debug: true,
});

export { handler as GET, handler as POST };
