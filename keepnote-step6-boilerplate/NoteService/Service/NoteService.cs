using System;
using System.Collections.Generic;
using NoteService.Exceptions;
using NoteService.Models;
using NoteService.Repository;

namespace NoteService.Service
{
    public class NoteService : INoteService
    {
        //define a private variable to represent repository
        INoteRepository repo;
        //Use constructor Injection to inject all required dependencies.

        public NoteService(INoteRepository _noteRepository)
        {
            this.repo = _noteRepository;
        }

        //This method should be used to create a new note.
        public bool CreateNote(Note note)
        {
            return repo.CreateNote(note);
        }

        //This method should be used to delete an existing note for a user
        public bool DeleteNote(string userId, int noteId)
        {
            bool status = repo.DeleteNote(userId, noteId);
            if (status)
            {
                return status;
            }
            else
            {
                throw new NoteNotFoundExeption($"NoteId {noteId} for user {userId} does not exist");

            }
        }

        //This methos is used to retreive all notes for a user
        public List<Note> GetAllNotesByUserId(string userId)
        {
            var _note = repo.FindAllNotesByUser(userId);
            //if (_note == null)
            //{
            //    throw new NoteNotFoundExeption($"Note with userId: {userId} does not exist");
            //}
            //else
            //{
                return _note;
            //}
        }

        //This method is used to update an existing note for a user
        public Note UpdateNote(int noteId, string userId, Note note)
        {

            if (repo.UpdateNote(noteId, userId, note))
            {
                return note;
            }
            else
            {
                throw new NoteNotFoundExeption($"NoteId {noteId} for user {userId} does not exist");
            }
        }

    }
}
