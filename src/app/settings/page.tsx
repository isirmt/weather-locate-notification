'use client';

import DefaultButton from "@/components/field/DefaultButton";
import DefaultInput from "@/components/field/DefaultInput";
import Main from "@/components/MainLayout";
import { Field, Label } from "@/components/SettingLayout";
import { TipsBulbCard, WarningCard } from "@/components/TipsCard";
import { setSettings, SettingsState } from "@/lib/SettingReducer";
import { RootState } from "@/lib/store";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Settings() {
  const settings = useSelector((state: RootState) => state.settingsState);
  const dispatch = useDispatch();

  const [localSettings, setLocalSettings] = useState<SettingsState>(settings);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleChange = (key: string, value: unknown) => {
    setLocalSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
    setIsChanged(JSON.stringify(settings) !== JSON.stringify({ ...localSettings, [key]: value }));
  };

  const handleCancel = () => {
    setLocalSettings(settings);
    setIsChanged(false);
  };

  const handleSave = () => {
    dispatch(setSettings(localSettings));
    setIsChanged(false);
  };

  return (
    <Main>
      <section className="flex flex-col items-stretch w-full max-w-[30rem] gap-4 p-4">
        <Field>
          <Label>バッググラウンドでの更新頻度 (分)</Label>
          <DefaultInput
            placeholder="時間を入力"
            value={localSettings.backgroundNoticeInterval?.toString()}
            setValue={(value) => handleChange("backgroundNoticeInterval", Number(value))}
          />
        </Field>
        <TipsBulbCard>
          <p>本アプリはウインドウを閉じている間もバッググラウンドでチェックを行います。</p>
          <p><b>「バッググラウンドでの更新頻度」</b>はそのチェック間隔を変更します。</p>
        </TipsBulbCard>

        <Field>
          <Label>確認する先の時間 (分)</Label>
          <DefaultInput
            placeholder="時間を入力"
            value={localSettings.checkingAfterMinute?.toString()}
            setValue={(value) => handleChange("checkingAfterMinute", Number(value))}
          />
        </Field>
        <TipsBulbCard>
          <p>降水があるか確認する先の時間を変更します。</p>
          <p>現在の時間を0として、先の時間を入力してください。</p>
          <p>降水量のデータは<b>15分ごと</b>に更新されます。</p>
        </TipsBulbCard>

        <div className={`flex flex-col p-4 gap-3 transition-opacity bg-gray-50 rounded ${isChanged ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
          <WarningCard>
            <p>保存していない変更があります！</p>
          </WarningCard>
          <div className="flex justify-center gap-3 flex-wrap md:justify-between">
            <DefaultButton onClick={handleCancel}>キャンセル</DefaultButton>
            <DefaultButton onClick={handleSave}>保存</DefaultButton>
          </div>
        </div>
      </section>
    </Main>
  );
}
