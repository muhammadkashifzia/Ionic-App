import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckIcon, XIcon } from "lucide-react";

interface PasswordValidationProps {
  password: string;
}

const PasswordValidation: React.FC<PasswordValidationProps> = ({ password }) => {
  const [allValid, setAllValid] = useState(false);

  const validationRules = [
    {
      label: "8文字以上で入力してください",
      isValid: password?.length >= 8,
    },
    {
      label: "少なくとも1つの数字（1〜9）を含めてください",
      isValid: /[0-9]/.test(password),
    },
    {
      label: "小文字か大文字を少なくとも1文字含めてください",
      isValid: /[a-zA-Z]/.test(password),
    },
  ];

  useEffect(() => {
    setAllValid(validationRules.every((rule) => rule.isValid));
  }, [password]);

  if (!password || allValid) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="bg-white rounded-lg p-4 mt-2 mb-4 shadow-md"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {validationRules.map((rule, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            {rule.isValid ? (
              <CheckIcon className="w-4 h-4 text-green-500" />
            ) : (
              <XIcon className="w-4 h-4 text-red-500" />
            )}
            <span className="text-sm text-gray-600">{rule.label}</span>
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default PasswordValidation;
