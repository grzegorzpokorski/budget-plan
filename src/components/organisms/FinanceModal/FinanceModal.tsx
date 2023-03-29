"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { financeFormSchema } from "@/shemas/forms";
import { Modal } from "@/components/molecules/Modal/Modal";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "../../molecules/Input/Input";
import { Textarea } from "@/components/molecules/Textarea/Textarea";
import { Select } from "@/components/molecules/Select/Select";
import { FormInfo } from "@/components/atoms/FormInfo/FormInfo";
import { Loader } from "@/components/molecules/Loader/loader";
import { useFinanceModal } from "./useFinanceModal";

type InputsType = z.infer<typeof financeFormSchema>;

export const FinanceModal = () => {
  const {
    modalData,
    budgets,
    closeModal,
    success,
    error,
    loading,
    disabledForm,
    createFinance,
    updateFinance,
    deleteFinance,
    formWasEdited,
    setFormWasEdited,
    financeModalType,
  } = useFinanceModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>({
    resolver: zodResolver(financeFormSchema),
  });

  const onSubmit: SubmitHandler<InputsType> = (data) => {
    const dataToRequest = { ...data, category: financeModalType };

    if (!modalData) {
      createFinance({ data: dataToRequest });
    }

    if (modalData) {
      updateFinance({ id: modalData.id, data: dataToRequest });
    }
  };

  return (
    <Modal
      title={
        modalData
          ? `Edytuj ${financeModalType === "PROFIT" ? "zysk" : "wydatek"}`
          : `Dodaj ${financeModalType === "PROFIT" ? "zysk" : "wydatek"}`
      }
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
              label="Tytuł"
              {...register("title")}
              isError={Boolean(errors.title)}
              errormessage={errors.title?.message || ""}
              required
              defaultValue={modalData?.title}
            />
          </div>
          <div className="w-full">
            <Input
              type="number"
              label="Wartość"
              {...register("amount")}
              isError={Boolean(errors.amount)}
              errormessage={errors.amount?.message || ""}
              required
              step={0.01}
              min={0.01}
              defaultValue={modalData?.amount}
            />
          </div>
          {budgets && (
            <div className="w-full">
              <Select
                label="Wybierz budżet"
                {...register("budgetId")}
                isError={Boolean(errors.budgetId)}
                errormessage={errors.budgetId?.message || ""}
                defaultValue={modalData?.budgetId}
                options={budgets.map((option) => ({
                  label: option.name,
                  value: option.id,
                }))}
                required
              />
            </div>
          )}
          <div className="w-full">
            <Textarea
              label="Dodatkowe informacje"
              {...register("description")}
              isError={Boolean(errors.description)}
              errormessage={errors.description?.message || ""}
              defaultValue={modalData?.description}
            />
          </div>
          <div className="flex flex-row gap-2 justify-end">
            {modalData ? (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() =>
                  deleteFinance({ id: modalData.id, title: modalData.title })
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
