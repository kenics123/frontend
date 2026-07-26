"use client";

import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import AdminShell from "../../../components/AdminShell";
import {
  activateContest,
  deactivateContest,
  formatShowDate,
  startContestVoting,
  stopContestVoting,
  toDateInputValue,
  updateCategory,
  updateContest,
  useAddCategory,
  useContestDetail,
  useContests,
  useCreateContest,
} from "../../../functions/admin";
import { formatNaira } from "../../../functions/contest";
import Loader from "../../../components/Loader";

export default function AdminContestsPage() {
  const [selectedId, setSelectedId] = useState("");
  const [contestForm, setContestForm] = useState({
    name: "",
    showDate: "",
    description: "",
  });
  const [editForm, setEditForm] = useState({
    name: "",
    showDate: "",
    description: "",
  });
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    price: "",
    votingPrice: "",
    description: "",
  });
  const [editingCategoryId, setEditingCategoryId] = useState("");
  const [editCategoryForm, setEditCategoryForm] = useState({
    name: "",
    price: "",
    votingPrice: "",
    description: "",
  });
  const [savingEdit, setSavingEdit] = useState(false);
  const [savingCategory, setSavingCategory] = useState(false);

  const { data: contests, isLoading, mutate } = useContests(true);
  const { data: selectedContest, mutate: mutateSelected } =
    useContestDetail(selectedId);
  const { trigger: createContest, isMutating: creatingContest } =
    useCreateContest();
  const { trigger: addCategory, isMutating: addingCategory } =
    useAddCategory(selectedId);

  useEffect(() => {
    if (!selectedId && contests?.length) {
      const active = contests.find((c) => c.isActive);
      setSelectedId((active || contests[0])._id);
    }
  }, [contests, selectedId]);

  useEffect(() => {
    if (!selectedContest) return;
    setEditForm({
      name: selectedContest.name || "",
      showDate: toDateInputValue(selectedContest.showDate),
      description: selectedContest.description || "",
    });
  }, [selectedContest]);

  const handleCreateContest = async (e) => {
    e.preventDefault();
    try {
      const created = await createContest({
        name: contestForm.name,
        showDate: contestForm.showDate,
        description: contestForm.description,
      });
      toast.success("Contest created. Add categories, then activate.");
      setContestForm({ name: "", showDate: "", description: "" });
      await mutate();
      setSelectedId(created._id);
    } catch (error) {
      toast.error(error?.message || "Could not create contest");
    }
  };

  const handleUpdateContest = async (e) => {
    e.preventDefault();
    if (!selectedId) return;
    setSavingEdit(true);
    try {
      await updateContest(selectedId, {
        name: editForm.name,
        showDate: editForm.showDate,
        description: editForm.description,
      });
      toast.success("Contest updated");
      await mutate();
      await mutateSelected();
    } catch (error) {
      toast.error(error?.message || "Could not update contest");
    } finally {
      setSavingEdit(false);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!selectedId) {
      toast.error("Select a contest first");
      return;
    }
    try {
      await addCategory({
        name: categoryForm.name,
        price: Number(categoryForm.price),
        votingPrice: Number(categoryForm.votingPrice),
        description: categoryForm.description,
      });
      toast.success("Category added");
      setCategoryForm({
        name: "",
        price: "",
        votingPrice: "",
        description: "",
      });
      await mutateSelected();
    } catch (error) {
      toast.error(error?.message || "Could not add category");
    }
  };

  const startEditCategory = (category) => {
    setEditingCategoryId(category._id);
    setEditCategoryForm({
      name: category.name || "",
      price: String(category.price ?? ""),
      votingPrice: String(category.votingPrice ?? ""),
      description: category.description || "",
    });
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!selectedId || !editingCategoryId) return;
    setSavingCategory(true);
    try {
      await updateCategory(selectedId, editingCategoryId, {
        name: editCategoryForm.name,
        price: Number(editCategoryForm.price),
        votingPrice: Number(editCategoryForm.votingPrice),
        description: editCategoryForm.description,
      });
      toast.success("Category updated");
      setEditingCategoryId("");
      await mutateSelected();
    } catch (error) {
      toast.error(error?.message || "Could not update category");
    } finally {
      setSavingCategory(false);
    }
  };

  const handleActivate = async () => {
    try {
      await activateContest(selectedId);
      toast.success("Contest activated");
      await mutate();
      await mutateSelected();
    } catch (error) {
      toast.error(error?.message || "Could not activate contest");
    }
  };

  const handleDeactivate = async () => {
    try {
      await deactivateContest(selectedId);
      toast.success("Contest deactivated");
      await mutate();
      await mutateSelected();
    } catch (error) {
      toast.error(error?.message || "Could not deactivate contest");
    }
  };

  const handleToggleVoting = async () => {
    try {
      if (selectedContest?.startVoting) {
        await stopContestVoting(selectedId);
        toast.success("Voting stopped");
      } else {
        await startContestVoting(selectedId);
        toast.success("Voting started");
      }
      await mutate();
      await mutateSelected();
    } catch (error) {
      toast.error(error?.message || "Could not update voting status");
    }
  };

  if (isLoading) {
    return (
      <AdminShell>
        <Loader text="Loading contests..." />
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <Toaster position="top-center" richColors />
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contests</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create contests, set the main show date, manage categories, and
            activate one contest at a time.
          </p>
        </div>

        <section className="bg-white rounded-2xl border border-pink-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Create Contest
          </h2>
          <form
            onSubmit={handleCreateContest}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <input
              required
              placeholder="Contest name"
              value={contestForm.name}
              onChange={(e) =>
                setContestForm((p) => ({ ...p, name: e.target.value }))
              }
              className="px-4 py-3 border border-pink-200 rounded-lg"
            />
            <input
              required
              type="date"
              value={contestForm.showDate}
              onChange={(e) =>
                setContestForm((p) => ({ ...p, showDate: e.target.value }))
              }
              className="px-4 py-3 border border-pink-200 rounded-lg"
            />
            <input
              placeholder="Description (optional)"
              value={contestForm.description}
              onChange={(e) =>
                setContestForm((p) => ({ ...p, description: e.target.value }))
              }
              className="px-4 py-3 border border-pink-200 rounded-lg"
            />
            <button
              type="submit"
              disabled={creatingContest}
              className="md:col-span-3 px-6 py-3 bg-pink-600 text-white rounded-full font-medium hover:bg-pink-700 disabled:opacity-60"
            >
              {creatingContest ? "Creating..." : "Create Contest"}
            </button>
          </form>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-pink-100 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">All Contests</h2>
            <div className="space-y-3">
              {(contests || []).map((contest) => (
                <button
                  key={contest._id}
                  type="button"
                  onClick={() => setSelectedId(contest._id)}
                  className={`w-full text-left p-4 rounded-xl border transition ${
                    selectedId === contest._id
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-pink-200"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-gray-900">{contest.name}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        contest.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {contest.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Show: {formatShowDate(contest.showDate)}
                  </p>
                  <p className="text-xs mt-1">
                    Voting:{" "}
                    <span
                      className={
                        contest.startVoting
                          ? "text-green-700 font-medium"
                          : "text-gray-500"
                      }
                    >
                      {contest.startVoting ? "On" : "Off"}
                    </span>
                  </p>
                </button>
              ))}
              {!contests?.length && (
                <p className="text-sm text-gray-500">No contests yet.</p>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-pink-100 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {selectedContest?.name || "Select a contest"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Main show: {formatShowDate(selectedContest?.showDate)}
                  </p>
                </div>
                {selectedContest && (
                  <div className="flex flex-wrap gap-2">
                    {selectedContest.isActive ? (
                      <button
                        type="button"
                        onClick={handleDeactivate}
                        className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm"
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleActivate}
                        className="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 text-sm"
                      >
                        Activate
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleToggleVoting}
                      className={`px-4 py-2 rounded-full text-sm ${
                        selectedContest.startVoting
                          ? "border border-amber-300 text-amber-800 hover:bg-amber-50"
                          : "bg-pink-600 text-white hover:bg-pink-700"
                      }`}
                    >
                      {selectedContest.startVoting
                        ? "Stop Voting"
                        : "Start Voting"}
                    </button>
                  </div>
                )}
              </div>

              {selectedContest && (
                <form
                  onSubmit={handleUpdateContest}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 p-4 rounded-xl bg-gray-50 border border-gray-100"
                >
                  <h3 className="md:col-span-2 font-semibold text-gray-800">
                    Edit Contest
                  </h3>
                  <input
                    required
                    placeholder="Contest name"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, name: e.target.value }))
                    }
                    className="px-4 py-3 border border-pink-200 rounded-lg bg-white"
                  />
                  <input
                    required
                    type="date"
                    value={editForm.showDate}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, showDate: e.target.value }))
                    }
                    className="px-4 py-3 border border-pink-200 rounded-lg bg-white"
                  />
                  <input
                    placeholder="Description"
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm((p) => ({
                        ...p,
                        description: e.target.value,
                      }))
                    }
                    className="md:col-span-2 px-4 py-3 border border-pink-200 rounded-lg bg-white"
                  />
                  <button
                    type="submit"
                    disabled={savingEdit}
                    className="md:col-span-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-black disabled:opacity-60"
                  >
                    {savingEdit ? "Saving..." : "Save Changes"}
                  </button>
                </form>
              )}

              <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
              <div className="space-y-3 mb-6">
                {(selectedContest?.categories || []).map((category) => (
                  <div
                    key={category._id}
                    className="p-3 rounded-lg bg-pink-50 border border-pink-100"
                  >
                    {editingCategoryId === category._id ? (
                      <form
                        onSubmit={handleUpdateCategory}
                        className="grid grid-cols-1 md:grid-cols-2 gap-2"
                      >
                        <input
                          required
                          value={editCategoryForm.name}
                          onChange={(e) =>
                            setEditCategoryForm((p) => ({
                              ...p,
                              name: e.target.value,
                            }))
                          }
                          className="px-3 py-2 border border-pink-200 rounded-lg bg-white"
                          placeholder="Name"
                        />
                        <input
                          required
                          type="number"
                          min="0"
                          value={editCategoryForm.price}
                          onChange={(e) =>
                            setEditCategoryForm((p) => ({
                              ...p,
                              price: e.target.value,
                            }))
                          }
                          className="px-3 py-2 border border-pink-200 rounded-lg bg-white"
                          placeholder="Registration fee"
                        />
                        <input
                          required
                          type="number"
                          min="0"
                          value={editCategoryForm.votingPrice}
                          onChange={(e) =>
                            setEditCategoryForm((p) => ({
                              ...p,
                              votingPrice: e.target.value,
                            }))
                          }
                          className="px-3 py-2 border border-pink-200 rounded-lg bg-white"
                          placeholder="Voting price"
                        />
                        <input
                          value={editCategoryForm.description}
                          onChange={(e) =>
                            setEditCategoryForm((p) => ({
                              ...p,
                              description: e.target.value,
                            }))
                          }
                          className="px-3 py-2 border border-pink-200 rounded-lg bg-white"
                          placeholder="Description"
                        />
                        <div className="md:col-span-2 flex gap-2">
                          <button
                            type="submit"
                            disabled={savingCategory}
                            className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm disabled:opacity-60"
                          >
                            {savingCategory ? "Saving..." : "Save"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingCategoryId("")}
                            className="px-4 py-2 border border-gray-300 rounded-full text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-medium text-gray-900">
                            {category.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Registration: {formatNaira(category.price)} · Vote:{" "}
                            {formatNaira(category.votingPrice || 0)} / vote
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => startEditCategory(category)}
                          className="px-3 py-1.5 text-sm border border-pink-300 text-pink-700 rounded-full hover:bg-pink-100"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                {!selectedContest?.categories?.length && (
                  <p className="text-sm text-gray-500">
                    No categories yet. Add at least one before activating.
                  </p>
                )}
              </div>

              <form
                onSubmit={handleAddCategory}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                <input
                  required
                  placeholder="Category name"
                  value={categoryForm.name}
                  onChange={(e) =>
                    setCategoryForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className="px-4 py-3 border border-pink-200 rounded-lg"
                />
                <input
                  required
                  type="number"
                  min="0"
                  placeholder="Registration fee (NGN)"
                  value={categoryForm.price}
                  onChange={(e) =>
                    setCategoryForm((p) => ({ ...p, price: e.target.value }))
                  }
                  className="px-4 py-3 border border-pink-200 rounded-lg"
                />
                <input
                  required
                  type="number"
                  min="0"
                  placeholder="Voting price per vote (NGN)"
                  value={categoryForm.votingPrice}
                  onChange={(e) =>
                    setCategoryForm((p) => ({
                      ...p,
                      votingPrice: e.target.value,
                    }))
                  }
                  className="px-4 py-3 border border-pink-200 rounded-lg"
                />
                <input
                  placeholder="Description"
                  value={categoryForm.description}
                  onChange={(e) =>
                    setCategoryForm((p) => ({
                      ...p,
                      description: e.target.value,
                    }))
                  }
                  className="px-4 py-3 border border-pink-200 rounded-lg"
                />
                <button
                  type="submit"
                  disabled={addingCategory || !selectedId}
                  className="md:col-span-2 px-6 py-3 bg-pink-600 text-white rounded-full font-medium hover:bg-pink-700 disabled:opacity-60"
                >
                  {addingCategory ? "Adding..." : "Add Category"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
