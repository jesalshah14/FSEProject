using System;
using System.Collections.Generic;
using System.Linq;
using ReminderService.Exceptions;
using ReminderService.Models;
using ReminderService.Repository;

namespace ReminderService.Service
{
    public class ReminderService : IReminderService
    {
        //define a private variable to represent repository
        private readonly IReminderRepository repo;
        //Use constructor Injection to inject all required dependencies.

        public ReminderService(IReminderRepository reminderRepository)
        {
            repo = reminderRepository;
        }

        //This method should be used to save a new reminder.
        public Reminder CreateReminder(Reminder reminder)
        {
            var rem = repo.CreateReminder(reminder);
            if (rem != null)
            {
                return rem;
            }
            else
            {
                throw new ReminderNotCreatedException($"This reminder already exists");
            }
        }
        //This method should be used to delete an existing reminder.
        public bool DeleteReminder(int reminderId)
        {


            bool status = repo.DeleteReminder(reminderId);
            if (status)
            {
                return status;
            }
            else
            {
                throw new ReminderNotFoundException($"This reminder id not found");
            }
        }
        // This method should be used to get all reminders by userId
        public List<Reminder> GetAllRemindersByUserId(string userId)
        {
            var rem = repo.GetAllRemindersByUserId(userId);
            if (rem == null || rem.Count == 0)
            {
                throw new ReminderNotFoundException($"This reminder id not found");
            }
            else
            {
                return rem;
            }
        }
        //This method should be used to get a reminder by reminderId.
        public Reminder GetReminderById(int reminderId)
        {
            var rem = repo.GetReminderById(reminderId);
            if (rem == null)
            {
                throw new ReminderNotFoundException($"This reminder id not found");
            }
            else
            {
                return rem;
            }
        }
        //This method should be used to update an existing reminder.
        public bool UpdateReminder(int reminderId, Reminder reminder)
        {
            var rem = repo.GetReminderById(reminderId);
            if (rem == null)
            {
                throw new ReminderNotFoundException($"This reminder id not found");
            }
            else
            {

                return repo.UpdateReminder(reminderId, reminder);
            }
        }
    }
}
