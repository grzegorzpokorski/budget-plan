"use client";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { budgetFormSchema } from "@/shemas/forms";
import { Modal } from "@/components/molecules/Modal/Modal";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/molecules/Input/Input";
import { FormInfo } from "@/components/atoms/FormInfo/FormInfo";
import { Loader } from "@/components/molecules/Loader/loader";
import { useBudgetModal } from "./useBudgetModal";
import { Select } from "@/components/molecules/Select/Select";

type InputsType = z.infer<typeof budgetFormSchema>;

export const BudgetModal = () => {
  const {
    modalData,
    closeModal,
    success,
    error,
    loading,
    disabledForm,
    setFormWasEdited,
    formWasEdited,
    createBudget,
    updateBudget,
    deleteBudget,
    budgetCategories,
  } = useBudgetModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>({
    resolver: zodResolver(budgetFormSchema),
  });

  const onSubmit: SubmitHandler<InputsType> = (data) => {
    if (!modalData) {
      createBudget({ data });
    }

    if (modalData) {
      updateBudget({ id: modalData.id, data });
    }
  };

  return (
    <Modal
      title={modalData ? "Edytuj budżet" : "Dodaj nowy budżet"}
      closeModal={closeModal}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => setFormWasEdited(true)}
        className="flex flex-col pt-6"
      >
        <fieldset disabled={disabledForm}>
          <div className="w-full">
            <Input
              type="text"
              label="Nazwa budżetu"
              {...register("name")}
              isError={Boolean(errors.name)}
              errormessage={errors.name?.message || ""}
              required
              defaultValue={modalData?.name}
            />
          </div>
          {budgetCategories && (
            <div className="w-full">
              <Select
                label="Wybierz kategorię"
                {...register("category")}
                isError={Boolean(errors.category)}
                errormessage={errors.category?.message || ""}
                defaultValue={modalData?.category || ""}
                options={budgetCategories.map((option) => ({
                  label: option.label,
                  value: option.value,
                }))}
                required
              />
            </div>
          )}
          <div className="w-full">
            <Input
              type="number"
              label="Docelowa wartość"
              {...register("maxAmount")}
              isError={Boolean(errors.maxAmount)}
              errormessage={errors.maxAmount?.message || ""}
              required
              step={0.01}
              min={0.01}
              defaultValue={modalData?.maxAmount}
            />
          </div>
          <div className="flex flex-row gap-2 justify-end">
            {modalData ? (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() =>
                  deleteBudget({ id: modalData.id, name: modalData.name })
                }
              >
                Usuń
              </Button>
            ) : (
              <Button type="reset" variant="outline" className="w-full">
                Reset
              </Button>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={Boolean(modalData) && !formWasEdited}
            >
              {modalData ? "Aktualizuj" : "Dodaj"}
            </Button>
          </div>
        </fieldset>
        {success && <FormInfo content={success} error={false} withMarginTop />}
        {error && <FormInfo content={error} error={true} withMarginTop />}
        {loading && (
          <div className="mt-4">
            <Loader />
          </div>
        )}
      </form>
    </Modal>
  );
};
