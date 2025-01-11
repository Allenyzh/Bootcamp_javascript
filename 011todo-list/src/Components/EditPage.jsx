export default function EditPage() {
  return (
    <>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <div className="flex gap-4 flex-col items-center">
            <h3 className="font-bold text-lg">Edit</h3>
            <p className="py-4">Press ESC key or click outside to close</p>
            <label className="input input-bordered flex items-center gap-2 max-w-40">
              Title
              <input type="text" className="grow" placeholder="type here..." />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Description
              <input type="text" className="grow" placeholder="type here..." />
            </label>
            <button className=" btn btn-accent">Create</button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
