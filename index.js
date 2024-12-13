import express from "express";
import cors from "cors";
import "dotenv/config";
import errorHandler from "./src/middleware/errorHandler.js";
import connectDB from "./src/config/mongoose.config.js";
import { CustomErrorHandler } from "./src/error/error.js";
import { join } from "path";

// Initialize Express
const app = express();
app.use(express.json());
app.use("/api/media", [express.static(join(process.cwd(), "public"))]);
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("Welcome to the Express App!");
});

app.post("/login", async (req, res, next) => {
  const { error, value } = loginValidation.validate(req.body);

  if (error) {
    return next(new CustomErrorHandler(error.message, 400));
  }

  const { username, password } = value;

  try {
    const checkAdmin = await Auth.findOne({ username });

    if (!checkAdmin) {
      return next(new ErrorHandler("User not found", 404));
    }

    let isValidPassword;
    let token;

    if (checkAdmin) {
      token = sign({ id: checkAdmin.id, username });
      isValidPassword = await comparePassword(password, checkAdmin.password);
    }

    if (!isValidPassword) {
      return next(
        new CustomErrorHandler("Username or password is not valid", 400)
      );
    }

    res.status(200).json({
      status: 200,
      data: checkAdmin,
      token,
      msg: "User successfully logged in",
    });
  } catch (err) {
    return next(new CustomErrorHandler(err.message, 400));
  }
});
app.post("/register",async (req, res, next) => {
  const { error, value } = loginValidation.validate(req.body);

  if (error) {
    return next(new CustomErrorHandler(error.message, 400));
  }

  const { username, password } = value;

  try {
    const checkAdmin = await Auth.findOne({ username });

    if (checkAdmin) {
      return next(new ErrorHandler("User already exist", 400));
    }
    let hashedPassword = await hashPassword(password)
    const newUser = await Auth.create({
      username,
      password:hashedPassword
    });
  

    let token = sign({ id: newUser.id, username });
    res.status(201).json({
      status:201,
      data:newUser,
      token,
      msg:'user successfuly registered'
    })
  
  } catch (err) {
    return next(new CustomErrorHandler(err.message, 400));
  }
});
app.get("/comments-list", async (req, res, next) => {
  try {
    const commentsData = await comment.find();

    if (!commentsData) {
      return next(new CustomErrorHandler(404, "commentlar topilmadi"));
    }

    res.status(200).json({
      message: "ok",
      data: commentsData,
      error: null,
    });
  } catch (error) {
    next(
      new CustomErrorHandler(500, "commentlarni  olishda  xatolik yuz berdi")
    );
  }
} );
app.post("/comments-create",async (req, res, next) => {
  const { username, usrjob, rate, msg } = req.body;
  try {
    if (!username || !usrjob || !rate || !msg) {
      return next(new CustomErrorHandler(400, "Barcha maydonlar toliq emas"));
    }
    const commentData = await comment.create({
      username,
      usrjob,
      rate,
      msg,
    });

    res.status(201).json({ msg: "comment yaratildi", data: commentData });
  } catch (error) {
    next(
      new CustomErrorHandler(
        500,
        `Comment yaratishda xatolik yuz berdi ${error}`
      )
    );
  }
});
app.put("/comments-update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const commentData = await comment.findById(id);

    if (!commentData) {
      return next(new CustomErrorHandler(404, "comment topilmadi"));
    }

    const updatedCommentData = await comment.findByIdAndUpdate(
      id,
      { $set: { ...req.body } },
      { new: true }
    );
    
    res
      .status(200)
      .json({ message: "mail yangilandi", data: updatedCommentData });
  } catch (error) {
    next(new CustomErrorHandler(500, "Mail yangilashda xatolik yuz berdi"));
  }
});
app.delete("/comments-delete/:id",async (req, res, next) => {
  try {
    const { id } = req.params;

    const checkComment = await comment.findById(id);

    if (!checkComment) {
      return next(new CustomErrorHandler("Comment not found", 404));
    }

    const deletedComment = await comment.deleteOne({  id });

    res.status(200).json({
      status: 200,
      data: deletedComment,
      msg: "Comment successfuly deleted",
    });
  } catch (err) {
    return next(new CustomErrorHandler(err.message, 500));
  }
} );
app.get("/experience-list", async (req, res, next) => {
  try {
    const experienceData = await experience.find();

    if (!experienceData) {
      return next(new CustomErrorHandler(404, "experience topilmadi"));
    }

    res.status(200).json({
      message: "ok",
      data: experienceData,
      error: null,
    });
  } catch (error) {
    next(
      new CustomErrorHandler(500, "experience  olishda  xatolik yuz berdi")
    );
  }
} );
app.post("/experience-create", async (req, res, next) => {
  const { company_name, period, job, description } = req.body;
  try {
    if (!company_name || !period || !job || !description ) {
      return next(new CustomErrorHandler(400, "Barcha maydonlar toliq emas"));
    }

    const checkExperience  = await experience.findOne({company_name})

    if (checkExperience) {
      return next(new CustomErrorHandler('Experience already created', 400))
    }

    const experinceData = await experience.create({
      company_name,
      period,
      job,
      description,
    });

    res.status(201).send({
      status:201,
      data: experinceData,
      msg:'new project successfuly created'
  })

  } catch (error) {
    next(
      new CustomErrorHandler(
        500,
        `experience yaratishda xatolik yuz berdi ${error}`
      )
    );
  }
});
app.put("/experience-update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const experienceData = await experience.findById(id);

    if (!experienceData) {
      return next(new CustomErrorHandler(404, "experience topilmadi"));
    }

    const updatedExperienceData = await experience.findByIdAndUpdate(
      id, 
      {$set:{...req.body}}
    );

    res.status(201).send({
      status:201,
      data: updatedExperienceData,
      msg:'new project successfuly created'
  })
  } catch (error) {
    next(
      new CustomErrorHandler(500, "experience yangilashda xatolik yuz berdi")
    );
  }
});
app.delete("/experience-delete/:id",async (req, res, next) => {
  try {
    const { id } = req.params;

    const checkExperience = await experience.findById(id);

    if (!checkExperience) {
      return next(new CustomErrorHandler("Experience not found", 404));
    }

    const deletedExperience = await experience.deleteOne({ id });

    res.status(200).json({
      status: 200,
      data: deletedExperience,
      msg: "Experience successfuly deleted",
    });
  } catch (err) {
    return next(new CustomErrorHandler(err.message, 500));
  }
});
app.get("/account", async (req, res, next) => {
  try {
    const { token } = req.body;
    const {accesstoken} = req.headers
    const { id, username } = verify(accesstoken || token);

    const currentUser = await Auth.findById(id);

    if (!currentUser) {
      return next(new CustomErrorHandler("User not found", 404));
    }

    res.status(200).json({
      status: 200,
      data: currentUser,
      msg: "ok",
    });
  } catch (err) {
    return next(new CustomErrorHandler(err.message, 500));
  }
});
app.get("/hero-list",async (req, res, next) => {
  try {
    const heroData = await hero.find();

    if (!heroData) {
      return next(new CustomErrorHandler(404, "hero topilmadi"));
    }

    res.status(200).json({
      message: "ok",
      data: heroData,
      error: null,
    });
  } catch (error) {
    next(new CustomErrorHandler(500, "heroni  olishda  xatolik yuz berdi"));
  }
});
app.post("/hero-create", async (req, res, next) => {
  const { title, description } = req.body;
  
  try {
    if (!title || !description) {
      return next(new CustomErrorHandler(400, "Barcha maydonlar toliq emas"));
    }

    if (typeof title !== "string" || typeof description !== "string") {
      return next(new CustomErrorHandler(400, "Ma'lumotlar noto‘g‘ri formatda"));
    }
    const heroData = await hero.create({ title, description});

    res.status(201).json({ msg: "hero yaratildi", data: heroData });
  } catch (error) {
    next(new CustomErrorHandler(500, "hero yaratishda xatolik yuz berdi"));
  }
} );
app.put("/hero-update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const heroData = await hero.findById(id);

    if (!heroData) {
      return next(new CustomErrorHandler(404, "hero topilmadi"));
    }

    const updatedheroData = await hero.update(
      { ...req.body },
      {
        where: { id: id },
      }
    );

    res
      .status(200)
      .json({ message: "hero yangilandi", data: updatedheroData });
  } catch (error) {
    next(new CustomErrorHandler(500, "hero yangilashda xatolik yuz berdi"));
  }
});
app.get("/mail-list",async (req, res, next) => {
  try {
    const maillsData = await mails.find();

    if (!maillsData) {
      return next(new CustomErrorHandler(404, "mailar topilmadi"));
    }

    res.status(200).json({
      message: "ok",
      data: maillsData,
      error: null,
    });
  } catch (error) {
    next(new CustomErrorHandler(500, "mailarni  olishda  xatolik yuz berdi"));
  }
});
app.post("/mail-create",async (req, res, next) => {
  const { name, email, msg } = req.body;
  try {
    if (!name || !email || !msg) {
      return next(new CustomErrorHandler(400, "Barcha maydonlar toliq emas"));
    }
    const mailData = await mails.create({ name, email, msg });
    bot.sendMessage('1043959566', `Hello, this is a message from your Portfolio sender: ${name} ,email: ${email}, message: ${msg}`);
    res.status(201).json({ msg: "mail yaratildi", data: mailData });
  } catch (error) {
    next(new CustomErrorHandler(500, "Mail yaratishda xatolik yuz berdi"));
  }
});
app.put("/mail-update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const mailData = await mails.findById(id);

    if (!mailData) {
      return next(new CustomErrorHandler(404, "mail topilmadi"));
    }

    const updatedMailData = await mails.findByIdAndUpdate(
      id, 
      {$set:{...req.body}}
    )

    res
      .status(200)
      .json({ message: "mail yangilandi", data: updatedMailData });
  } catch (error) {
    next(new CustomErrorHandler(500, "Mail yangilashda xatolik yuz berdi"));
  }
});
app.delete("/mail-delete/:id",async (req, res, next) => {
  try {
    const { id } = req.params;

    const checkMail = await mails.findById(id);

    if (!checkMail) {
      return next(new CustomErrorHandler("Mail not found", 404));
    }

    const deletedMail = await mails.deleteOne({id});

    res.status(200).json({
      status: 200,
      data: deletedMail,
      msg: "Mail successfuly deleted",
    });
  } catch (err) {
    return next(new CustomErrorHandler(err.message, 500));
  }
} );
app.get("/project-list", async (req, res, next) => {
  try {
    const projectsData = await projects.find();

    if (!projectsData) {
      return next(new CustomErrorHandler(404, "project topilmadi"));
    }

    res.status(200).json({
      message: "ok",
      data: projectsData,
      error: null,
    });
  } catch (error) {
    next(new CustomErrorHandler(500, "project  olishda  xatolik yuz berdi"));
  }
});
app.get("/project-get/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new CustomErrorHandler("id required", 400));
    }

    const currentProject = await projects.findById(id);

    if (!currentProject) {
      return next(new CustomErrorHandler("Project not found", 404));
    }

    res.status(200).json({
      status: 200,
      data: currentProject,
      msg: "ok",
    });
  } catch (err) {
    return next(new CustomErrorHandler(err.message, 500));
  }
})
app.post("/project-create", async (req, res, next) => {
  const {
    title,
    description,
    source_link,
    live_site,
    technalogies,
  } = req.body;
  
  try {
    if (
      !title ||
      !description ||
      !source_link ||
      !live_site ||
      !technalogies 
    ) {
      return next(new CustomErrorHandler(400, "Barcha maydonlar toliq emas"));
    }

    const projectsData = await projects.create({
      title,
      description,
      source_link,
      live_site,
      technalogies,
    });

    res.status(201).json({ msg: "project yaratildi", data: projectsData });
  } catch (error) {
    next(
      new CustomErrorHandler(
        500,
        `project yaratishda xatolik yuz berdi ${error}`
      )
    );
  }
});
app.put("/project-update/:id",async (req, res) => {
  const { id } = req.params;
  try {
    const projectsData = await projects.findById(id);

    if (!projectsData) {
      return next(new CustomErrorHandler(404, "project topilmadi"));
    }

    const updatedprojectsData = await projects.findByIdAndUpdate(
      id, 
      {$set:{...req.body}}
    )

    res.status(200).json({
      message: "project yangilandi",
      data: updatedprojectsData,
    });
  } catch (error) {
    next(
      new CustomErrorHandler(500, "project yangilashda xatolik yuz berdi")
    );
  }
} );
app.delete("/project-delete/:id",async (req, res, next) => {
  try {
    const { id } = req.params;

    const checkProject = await projects.findById(id);

    if (!checkProject) {
      return next(new CustomErrorHandler("Project not found", 404));
    }

    const deletedProject = await projects.deleteOne({ id });

    res.status(200).json({
      status: 200,
      data: deletedProject,
      msg: "Project successfuly deleted",
    });
    
  } catch (err) {
    return next(new CustomErrorHandler(err.message, 500));
  }
});

// erro handler
app.use(errorHandler);

// Initialize server
app.listen(5000, () => {
  console.log(`server run ${5000}`);
  connectDB();
});

export default app;
