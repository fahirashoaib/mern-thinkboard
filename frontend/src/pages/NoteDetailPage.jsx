import { useState, useEffect } from "react";
import api from "../lib/axios";
import { useNavigate, useParams, Link } from "react-router";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, TrashIcon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams()
  //console.log({id})
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      }
      catch (error) {
        console.log("Error in fetching note:", error);
        toast.error("Error fetching note:");
      }
      finally {
        setLoading(false);
      }
    }
    fetchNote();
  }, [id]);

  console.log({ note });

  const handleDelete = async () => {

    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    }
    catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  }

  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim()) {
      toast.error("Please add title or content");
      return;
    }
    setSaving(true);
    try {
      const res = await api.put(`/notes/${id}`, note);
      setNote(res.data);
      toast.success("Note updated successfully");
      navigate("/");
    }
    catch (error) {
      console.log("Error in handleSave", error);
      toast.error("Failed to update note");
    }
    finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to={"/"} className="btn btn-ghost rounded-full">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline rounded-full">
              <TrashIcon className="h-5 w-5" />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text" className="input input-bordered rounded-3xl" value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea className="textarea textarea-bordered h-32 rounded-3xl" value={note.content} onChange={(e) => setNote({ ...note, content: e.target.value })} />
              </div>
              <div className="card-actions justify-end">
                <button className="btn bg-[#00FF9D] hover:bg-[#00FF9D]/90 transition-all rounded-full text-black" onClick={handleSave}>
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default NoteDetailPage