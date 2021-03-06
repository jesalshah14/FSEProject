using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;
using ReminderService.Models;

namespace ReminderService.Repository
{
    public class ReminderRepository:IReminderRepository
    {
        //define a private variable to represent ReminderContext
        ReminderContext context;
        public ReminderRepository(ReminderContext _context)
        {
            this.context = _context;
        }
        //This method should be used to save a new reminder.
        public Reminder CreateReminder(Reminder reminder)
        {
            try
            {
                var cat = context.Reminders.Find(_ => true).ToList();
                bool isNameExist = cat.Find(s => s.Name == reminder.Name && s.CreatedBy == reminder.CreatedBy) == null ? true : false;
                if (isNameExist == false)
                {
                    return null;

                }
                else
                {
                    var recentCategory = context.Reminders.Find(f => f.Id != reminder.Id).ToList().OrderByDescending(o => o.Id).FirstOrDefault();
                    var id = 10;
                    if (recentCategory != null)
                    {
                        id = recentCategory.Id + 1;
                    }
                    reminder.Id = id;
                    reminder.CreationDate = DateTime.Now;

                    context.Reminders.InsertOne(reminder);

                    return context.Reminders.Find( R => R.Name == reminder.Name).FirstOrDefault();
                }

            }
            catch
            {
                return null;
            }

        }
        //This method should be used to delete an existing reminder.
        public bool DeleteReminder(int reminderId)
        {
            /// var count = context.Reminders.DeleteOne(C => C.reminderId == userId);
            ////return count.DeletedCount > 0;

            bool status = false;
            var rem = context.Reminders.Find(D => D.Id == reminderId).FirstOrDefault();
            if (rem != null)
            {
                var count = context.Reminders.DeleteOne(D => D.Id == reminderId);
                status = count.IsAcknowledged ? true : false;
            }
            else
            {
                status = false;
            }
            return status;
        }
        //This method should be used to get all reminders by userId
        public List<Reminder> GetAllRemindersByUserId(string userId)
        {
            return context.Reminders.Find(D => D.CreatedBy == userId).ToList();
        }
        //This method should be used to get a reminder by reminderId
        public Reminder GetReminderById(int reminderId)
        {
            return context.Reminders.Find(D => D.Id == reminderId).FirstOrDefault();
        }
        // This method should be used to update an existing reminder.
        public bool UpdateReminder(int reminderId, Reminder reminder)
        {
            bool status = false;
            var filter = Builders<Reminder>.Filter.Where(D => D.Id == reminderId);
            var update = Builders<Reminder>.Update.Set(R => R.Name, reminder.Name).Set(R => R.Description, reminder.Description)
                .Set(R => R.Type, reminder.Type).Set(R => R.CreatedBy, reminder.CreatedBy);

            var updateResult = context.Reminders.UpdateOne(filter, update);
            if (updateResult != null)
            {
                status = true;
            }
            return status;
            ////return updateResult.ModifiedCount > 0;
        }
    }
}
