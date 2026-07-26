"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import {
  activateContest,
  clearAdminSession,
  deactivateContest,
  getAdminToken,
  getStoredAdmin,
  markContactRead,
  useAddCategory,
  useContactMessages,
  useContestDetail,
  useContests,
  useCreateContest,
} from "../../functions/admin";
import { formatNaira } from "../../functions/contest";
import Loader from "../../components/Loader";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [selectedId, setSelectedId] = useState("");
  const [contestForm, setContestForm] = useState({
    name: "",
    year: new Date().getFullYear(),
    description: "",
  });
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  const { data: contests, isLoading, mutate } = useContests(ready);
  const { data: selectedContest, mutate: mutateSelected } =
    useContestDetail(selectedId);
  const {
    data: contactMessages,
    mutate: mutateContacts,
  } = useContactMessages(ready);
  const { trigger: createContest, isMutating: creatingContest } =
    useCreateContest();
  const { trigger: addCategory, isMutating: addingCategory } =
    useAddCategory(selectedId);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    setAdmin(getStoredAdmin());
    setReady(true);
  }, [router]);

  useEffect(() => {
    if (!selectedId && contests?.length) {
      const active = contests.find((c) => c.isActive);
      setSelectedId((active || contests[0])._id);
    }
  }, [contests, selectedId]);

  const logout = () => {
    clearAdminSession();
    router.replace("/admin/login");
  };

  const handleCreateContest = async (e) => {
    e.preventDefault();
    try {
      const created = await createContest({
        name: contestForm.name,
        year: Number(contestForm.year),
        description: contestForm.description,
      });
      toast.success("Contest created (inactive). Add categories, then activate.");
      setContestForm({
        name: "",
        year: new Date().getFullYear(),
        description: "",
      });
      await mutate();
      setSelectedId(created._id);
    } catch (error) {
      toast.error(error?.message || "Could not create contest");
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
        description: categoryForm.description,
      });
      toast.success("Category added");
      setCategoryForm({ name: "", price: "", description: "" });
      await mutateSelected();
    } catch (error) {
      toast.error(error?.message || "Could not add category");
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

  const handleMarkRead = async (id) => {
    try {
      await markContactRead(id);
      await mutateContacts();
    } catch (error) {
      toast.error(error?.message || "Could not update message");
    }
  };

  if (!ready || isLoading) return <Loader text="Loading admin..." />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" richColors />
      <header className="bg-white border-b border-pink-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div>
            <Link href="/" className="text-xl font-bold text-pink-600">
              KENICS
            </Link>
            <span className="ml-3 text-sm text-gray-500">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:inline">
              {admin?.name || admin?.email}
            </span>
            <button
              type="button"
              onClick={logout}
              className="text-sm px-4 py-2 rounded-full border border-pink-200 text-pink-700 hover:bg-pink-50"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <section className="bg-white rounded-2xl border border-pink-100 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Create Contest
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Only one contest can be active at a time. Deactivate the current
            contest before creating a new one.
          </p>
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
              type="number"
              placeholder="Year"
              value={contestForm.year}
              onChange={(e) =>
                setContestForm((p) => ({ ...p, year: e.target.value }))
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
            <h2 className="text-lg font-bold text-gray-900 mb-4">Contests</h2>
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
                  <p className="text-sm text-gray-500 mt-1">{contest.year}</p>
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
                    {selectedContest?.description ||
                      "Manage categories and activation"}
                  </p>
                </div>
                {selectedContest && (
                  <div className="flex gap-2">
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
                  </div>
                )}
              </div>

              <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
              <div className="space-y-2 mb-6">
                {(selectedContest?.categories || []).map((category) => (
                  <div
                    key={category._id}
                    className="flex items-center justify-between p-3 rounded-lg bg-pink-50 border border-pink-100"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{category.name}</p>
                      <p className="text-xs text-gray-500">
                        slug: {category.slug}
                      </p>
                    </div>
                    <p className="font-semibold text-pink-700">
                      {formatNaira(category.price)}
                    </p>
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
                className="grid grid-cols-1 md:grid-cols-3 gap-3"
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
                  placeholder="Price (NGN)"
                  value={categoryForm.price}
                  onChange={(e) =>
                    setCategoryForm((p) => ({ ...p, price: e.target.value }))
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
                  className="md:col-span-3 px-6 py-3 bg-pink-600 text-white rounded-full font-medium hover:bg-pink-700 disabled:opacity-60"
                >
                  {addingCategory ? "Adding..." : "Add Category"}
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-pink-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Contact Messages</h2>
            <span className="text-sm text-gray-500">
              {(contactMessages || []).filter((m) => !m.isRead).length} unread
            </span>
          </div>

          <div className="space-y-3 max-h-[480px] overflow-y-auto">
            {(contactMessages || []).map((msg) => (
              <div
                key={msg._id}
                className={`rounded-xl border p-4 ${
                  msg.isRead
                    ? "border-gray-200 bg-white"
                    : "border-pink-200 bg-pink-50"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-900">{msg.name}</p>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-sm text-pink-600 hover:underline"
                    >
                      {msg.email}
                    </a>
                    {msg.subject && (
                      <p className="text-sm font-medium text-gray-800 mt-2">
                        {msg.subject}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">
                      {msg.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {msg.createdAt
                        ? new Date(msg.createdAt).toLocaleString()
                        : ""}
                    </p>
                  </div>
                  {!msg.isRead && (
                    <button
                      type="button"
                      onClick={() => handleMarkRead(msg._id)}
                      className="shrink-0 text-sm px-3 py-1.5 rounded-full border border-pink-300 text-pink-700 hover:bg-pink-100"
                    >
                      Mark read
                    </button>
                  )}
                </div>
              </div>
            ))}
            {!contactMessages?.length && (
              <p className="text-sm text-gray-500">No contact messages yet.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
