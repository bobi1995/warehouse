import * as Dialog from "@radix-ui/react-dialog";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import EditMaterialForm from "./edit-form";
import { Material } from "@/db/interfaces/types";

interface EditMaterialProps {
  material: Material;
}
const EditMaterial: React.FC<EditMaterialProps> = ({ material }) => {
  const { lesto_code } = material;
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="  m-auto px-4 py-2 bg-main-100 text-white rounded  hover:bg-main-200">
          <PencilSquareIcon className="w-6 h-6" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed grid inset-0 bg-black bg-opacity-30" />
        <Dialog.Content className="max-h-[90vh] overflow-y-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg max-w-2xl w-full p-6">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Материал {lesto_code}
          </Dialog.Title>
          <Dialog.Description className="mb-4 text-gray-600">
            Редактирай или изтрий този материал
          </Dialog.Description>

          <div>
            <EditMaterialForm material={material} />
          </div>

          <Dialog.Close asChild>
            <button
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <XMarkIcon color="red" width={30} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditMaterial;
