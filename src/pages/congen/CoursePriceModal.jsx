// CoursePriceModal.jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
    ChevronDown, Users, Award, Clock, Check, X, 
    DollarSign, Tag, Layers
} from 'lucide-react';

const CoursePriceModal = ({ isOpen, onClose, onSave, initialData }) => {
    
    const [courseType, setCourseType] = useState('');
    
    const [priceData, setPriceData] = useState({
        groupRegStart: '',
        groupRegEnd: '',
        maxStudents: 100,
        batchNo: '',
        batchStart: '',
        batchEnd: '',
        courseFees: 100,
        discount: 10,
        finalPrice: 90,
        duration: '3 Weeks',
        certificate: true
    });

    // Load initial data when modal opens
    useEffect(() => {
        if (isOpen && initialData) {
            setCourseType(initialData.courseType || '');
            setPriceData({
                groupRegStart: initialData.groupRegStart || '',
                groupRegEnd: initialData.groupRegEnd || '',
                maxStudents: initialData.maxStudents || 100,
                batchNo: initialData.batchNo || '',
                batchStart: initialData.batchStart || '',
                batchEnd: initialData.batchEnd || '',
                courseFees: initialData.courseFees || 100,
                discount: initialData.discount || 10,
                finalPrice: initialData.finalPrice || 90,
                duration: initialData.duration || '3 Weeks',
                certificate: initialData.certificate !== undefined ? initialData.certificate : true
            });
        }
    }, [isOpen, initialData]);

    // Calculate final price when fees or discount changes
    useEffect(() => {
        const final = priceData.courseFees - priceData.discount;
        setPriceData(prev => ({ ...prev, finalPrice: final > 0 ? final : 0 }));
    }, [priceData.courseFees, priceData.discount]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handlePriceInputChange = (field, value) => {
        setPriceData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        const dataToSave = {
            ...priceData,
            courseType: courseType
        };
        onSave(dataToSave);
        onClose();
    };

    const handleClose = () => {
        onClose();
    };

    // Don't render if not open
    if (!isOpen) return null;

    // Modal JSX
    const modalJSX = (
        <div 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 99999,
                padding: '16px'
            }}
            onClick={handleClose}
        >
            <div 
                style={{
                    backgroundColor: 'white',
                    width: '100%',
                    maxWidth: '700px',
                    borderRadius: '16px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    overflow: 'hidden',
                    maxHeight: '90vh',
                    display: 'flex',
                    flexDirection: 'column'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                
                {/* Modal Header */}
                <div className=" px-6 py-4 flex justify-between items-center flex-shrink-0">
                    <div className="flex items-center gap-3">
                        
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Publish Course</h2>
                            <p className="text-xs text-gray-500">Set pricing and registration details</p>
                        </div>
                    </div>
                    <button 
                        onClick={handleClose}
                        className="rounded-full p-2 hover:bg-white/20 transition-colors"
                    >
                        <X className="h-5 w-5 text-white" />
                    </button>
                </div>

                {/* Modal Body - Scrollable */}
                <div className="p-6 overflow-y-auto flex-1">
                    
                    {/* Dropdown - Publish As */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Publish As <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                value={courseType}
                                onChange={(e) => setCourseType(e.target.value)}
                                className="w-full border-2 border-slate-200 rounded-xl p-3 pr-10 text-sm font-medium text-slate-700 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all appearance-none cursor-pointer"
                            >
                                <option value="">Select Course Type</option>
                                <option value="individual">Individual Course</option>
                                <option value="group">Group Course</option>
                                <option value="both">Individual + Group</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* GROUP FIELDS */}
                    {(courseType === "group" || courseType === "both") && (
                        <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 mb-6">
                            <h3 className="text-sm font-bold text-purple-800 mb-4 flex items-center gap-2">
                                <Users size={16} />
                                Group Registration Details
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Registration Start
                                    </label>
                                    <input 
                                        type="date" 
                                        value={priceData.groupRegStart}
                                        onChange={(e) => handlePriceInputChange('groupRegStart', e.target.value)}
                                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Registration End
                                    </label>
                                    <input 
                                        type="date"
                                        value={priceData.groupRegEnd}
                                        onChange={(e) => handlePriceInputChange('groupRegEnd', e.target.value)}
                                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Max Students
                                    </label>
                                    <input 
                                        type="number" 
                                        value={priceData.maxStudents}
                                        onChange={(e) => handlePriceInputChange('maxStudents', parseInt(e.target.value) || 0)}
                                        placeholder="100"
                                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Batch No
                                    </label>
                                    <input 
                                        type="text"
                                        value={priceData.batchNo}
                                        onChange={(e) => handlePriceInputChange('batchNo', e.target.value)}
                                        placeholder="IGS001"
                                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Batch Start Date
                                    </label>
                                    <input 
                                        type="date"
                                        value={priceData.batchStart}
                                        onChange={(e) => handlePriceInputChange('batchStart', e.target.value)}
                                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Batch End Date
                                    </label>
                                    <input 
                                        type="date"
                                        value={priceData.batchEnd}
                                        onChange={(e) => handlePriceInputChange('batchEnd', e.target.value)}
                                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    
                    {(courseType === "individual" || courseType === "both") && (
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
                            <h3 className="text-sm font-bold text-blue-800 mb-4 flex items-center gap-2">
                                <DollarSign size={16} />
                                Individual Course Details
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Access Duration
                                    </label>
                                    <select className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all">
                                        <option value="lifetime">Lifetime Access</option>
                                        <option value="1year">1 Year</option>
                                        <option value="6months">6 Months</option>
                                        <option value="3months">3 Months</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Start Immediately
                                    </label>
                                    <div className="flex items-center gap-3 mt-2">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                defaultChecked={true}
                                                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-slate-700">Yes, start after purchase</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PRICE FIELDS */}
                    {courseType && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
                            <h3 className="text-sm font-bold text-green-800 mb-4 flex items-center gap-2">
                                <Tag size={16} />
                                Pricing Details
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Course Fees ($)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                        <input 
                                            type="number"
                                            value={priceData.courseFees}
                                            onChange={(e) => handlePriceInputChange('courseFees', parseFloat(e.target.value) || 0)}
                                            className="w-full border border-slate-200 rounded-lg p-2.5 pl-7 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Discount ($)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                        <input 
                                            type="number"
                                            value={priceData.discount}
                                            onChange={(e) => handlePriceInputChange('discount', parseFloat(e.target.value) || 0)}
                                            className="w-full border border-slate-200 rounded-lg p-2.5 pl-7 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Final Price ($)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600 font-bold">$</span>
                                        <input 
                                            type="number"
                                            value={priceData.finalPrice}
                                            readOnly
                                            className="w-full border border-green-300 rounded-lg p-2.5 pl-7 text-sm bg-green-100 font-bold text-green-700"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Course Duration
                                    </label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <input
                                            type="text"
                                            value={priceData.duration}
                                            onChange={(e) => handlePriceInputChange('duration', e.target.value)}
                                            placeholder="e.g., 3 Weeks, 2 Months"
                                            className="w-full border border-slate-200 rounded-lg p-2.5 pl-10 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Certificate
                                    </label>
                                    <div className="flex items-center gap-3 mt-2">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={priceData.certificate}
                                                onChange={(e) => handlePriceInputChange('certificate', e.target.checked)}
                                                className="w-4 h-4 rounded border-slate-300 text-green-600 focus:ring-green-500"
                                            />
                                            <span className="text-sm text-slate-700">Provide Certificate</span>
                                        </label>
                                        <Award size={16} className="text-amber-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                   
                </div>

                {/* Modal Footer */}
                <div className="border-t border-slate-200 px-6 py-4 bg-slate-50 flex justify-end gap-3 flex-shrink-0">
                    <button
                        onClick={handleClose}
                        className="px-5 py-2.5 border border-slate-300 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSave}
                        disabled={!courseType}
                        className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                            courseType 
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:scale-[1.02]' 
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                    >
                        <Check size={16} />
                        Save & Apply
                    </button>
                </div>
            </div>
        </div>
    );

    // ⭐ USE REACT PORTAL - Renders modal at document.body level
    return ReactDOM.createPortal(modalJSX, document.body);
};

export default CoursePriceModal;