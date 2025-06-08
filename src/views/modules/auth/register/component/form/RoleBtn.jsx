import React from "react";
import { User, Building } from "lucide-react";

const RoleBtn = ({ formik }) => {
    return (
        <div>
            <div className="flex justify-center space-x-4">
                <button
                    type="button"
                    onClick={() => formik.setFieldValue("role", "user")}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${formik.values.role === "user"
                        ? "bg-secondary/20 text-secondary border border-secondary"
                        : "bg-white/5 text-background-light/70 border border-background-light/20 hover:bg-white/10"
                        }
          `}
                >
                    <User size={16} />
                    <span>User</span>
                </button>

                <button
                    type="button"
                    onClick={() => formik.setFieldValue("role", "company")}
                    className={`px - 4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${formik.values.role === "company"
                            ? "bg-secondary/20 text-secondary border border-secondary"
                            : "bg-white/5 text-background-light/70 border border-background-light/20 hover:bg-white/10"
                        }
                `}
                >
                    <Building size={16} />
                    <span>Company</span>
                </button>
            </div>
        </div >
    );
};

export default RoleBtn;