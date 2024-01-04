const taApplicationMapper = (obj) => {
  if (obj.appDate) {
    const newDate = new Date(obj.appDate);
    obj.appDate = newDate;
  }
  if (obj.taApplicationId) {
    const appId = Number(obj.taApplicationId);
    obj.taApplicationId = appId;
  }
  return {
    FirstName: obj.firstName,
    LastName: obj.lastName,
    Email: obj.email,
    Phone: obj.phone,
    AppointmentReqested: obj.appointmentRequested,
    ClassLevel: obj.classLevel,
    Major: obj.major,
    ReferenceName: obj.referenceName,
    AreaOfStudy: obj.areaOfStudy,
    CoursesTaughtPreviously: obj.coursesTaughtPreviously,
    CoursesTaughtLastSem: obj.coursesTaughtLastSem,
    PreferredCourses: obj.preferredCourses,
    NotPreferredCourses: obj.notPreferredCourses,
    PreferredFaculties: obj.preferredFaculties,
    TAComments: obj.comments,
    TAApplicationId: obj.taApplicationId,
    AppDate: obj.appDate,
    Status: obj.status,
    Schedule: obj.schedule,
  };
};

module.exports = { taApplicationMapper };
