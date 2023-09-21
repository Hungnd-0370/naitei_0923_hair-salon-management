import React, { useState, useEffect } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import { Form, Input, Select, Button, notification } from 'antd';
import { useLang } from '../../Context/LangContext';
import { Inertia } from '@inertiajs/inertia'
import 'antd/dist/antd.css';

export default function Edit(props) {
    const [product, setProduct] = useState(props[0].product);
    const { lang } = useLang();
    const [form] = Form.useForm();

    const categories = props[0].categories;

    useEffect(() => {
        fillInitialValue();
    }, []);

    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 12,
        },
    };

    const tailLayout = {
        wrapperCol: {
            offset: 6,
            span: 12,
        },
    };

    const onFinish = (values) => {

        Inertia.put(route('products.update', { id: product.id }), values, {
            onSuccess: () => {
                openNotification('success',
                    lang.get('strings.Successfully-Updated'),
                    lang.get('strings.Product-Updated-Noti')
                );
            },
            onError: (error) => {
                openNotification('error',
                    lang.get('strings.Somethings-went-wrong'),
                    error.update
                );
            }
        })
    };

    const fillInitialValue = () => {
        form.setFieldsValue(product);
    };

    const categoryOptions = [];

    categories.forEach((role) => {
        categoryOptions.push({
            label: role.name,
            value: role.id,
        })
    });

    const openNotification = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{lang.get('strings.dashboard')}</h2>}
        >
            <Head title="Edit User" />

            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="mb-8 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <h3 className="text-2xl leading-6 font-medium text-gray-900">
                            {lang.get('strings.Edit-Product')}: {product.name}
                        </h3>
                    </div>
                    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="unit"
                            label="Unit"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="cost"
                            label="Cost"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="category"
                            label="Category"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                allowClear
                                options={categoryOptions}
                            />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                {lang.get('strings.Update')}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Authenticated>
    );
}
