import { createBlogInput, updateBlogInput } from "../../../common/src/index";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  try {
    const token = authHeader.split(" ")[1];
    if (!token) {
      c.status(401);
      return c.json({ message: "No token provided" });
    }

    const user = await verify(token, c.env.JWT_SECRET);
    console.log("Decoded user payload:", user);

    if (user) {
      c.set("userId", user.userId as string);
      await next();
    } else {
      c.status(403);
      return c.json({ message: "Invalid token" });
    }
  } catch (e) {
    c.status(403);
    return c.json({ message: "Unauthorized" });
  }
});

blogRouter.post("/postblog", async (c) => {
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Inputs not correct" });
  }

  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      published: body.published ?? false,
      authorId: String(authorId),
    },
  });

  return c.json({ id: blog.id });
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Inputs not correct" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
      published: body.published ?? true,
    },
  });

  return c.json({ id: blog.id });
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({ blogs });
});

blogRouter.get("/getByUser/:userId", async (c) => {
  const userId = c.req.param("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.post.findMany({
      where: {
        authorId: String(userId),
      },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (blogs.length === 0) {
      c.status(404);
      return c.json({ message: "No blogs found for this user" });
    }

    return c.json({ blogs });
  } catch (e) {
    console.error(e);
    c.status(500);
    return c.json({ message: "Error while fetching blogs by user" });
  }
});
