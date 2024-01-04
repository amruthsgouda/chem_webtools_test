const dynamoose = require("dynamoose");

const taApplicationSchema = new dynamoose.Schema(
  {
    TAApplicationId: {
      type: Number,
      hashKey: true,
    }, //Primary Key
    ASUId: String,
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Phone: {
      type: String,
      required: true,
    },
    AppointmentReqested: {
      type: String,
      enum: ["fullTime", "partTime"],
    },
    ClassLevel: {
      type: String,
      enum: ["Undergraduate", "Graduate"],
      required: true,
    },
    Major: {
      type: String,
      required: true,
    },
    ReferenceName: String,
    AreaOfStudy: {
      type: String,
      required: true,
    },
    CoursesTaughtPreviously: Array,
    CoursesTaughtLastSem: Array,
    PreferredCourses: Array,
    NotPreferredCourses: Array,
    PreferredFaculties: Array,
    AsuriteId: String,
    EMPId: String,
    TAComments: String,
    AppDate: {
      type: Date,
      required: false,
    },
    AppTerm: String,
    AppTermDisplay: String,
    Status: {
      type: String,
      enum: ["Pending", "Approved"],
      required: true,
    },
    SemesterStarted: String,
    SpeakStatus: String,
    DeclineOff: String,
    Schedule: {
      type: Array,
      required: true,
      Schema: {
        courseName: {
          type: String,
          required: true,
        },
        startTime: {
          type: String,
          required: true,
        },
        endTime: {
          type: String,
          required: true,
        },
        weekday: {
          type: String,
          required: true,
          enum: ["MWF", "TTh", "Mon", "Tue", "Wed", "Thu", "Fri"],
        },
      },
    },
  },
  {
    saveUnknown: true,
    timestamps: {
      createdAt: "createDate",
      updatedAt: "updateDate",
    },
  }
);

const taApplication = dynamoose.model(
  "TAApplicationModel",
  taApplicationSchema
);

module.exports = taApplication;
