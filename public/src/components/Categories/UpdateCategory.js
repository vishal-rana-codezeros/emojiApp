import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOneCategoryData, updateCategory } from '../../action/user.action';
// import { Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import {
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Button,
	Card,
	CardBody,
	CardFooter,
	Col,
	Container,
	Form,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Row,
} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import validateInput from '../../shared/Category/CategoryValidate';
import ImageUploader from 'react-images-upload';
import axios from 'axios';

class UpdateCategory extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			categoryName: '',
			errors: {},
			isValid: false,
			isSubmit: false,
			isLogin: true,
			image: [],
			imgSrc: [],
		};

		this.onTextChange = this.onTextChange.bind(this);
		this.onClickToEdit = this.onClickToEdit.bind(this);
		this.handleselect = this.handleselect.bind(this);
	}

	toggle = () => {
		this.setState({ open: !this.state.open }, () => {
			if (this.state.open) {
				this.props.getOneCategoryData(this.props.editId).then(res => {
					if (res.status == 200) {
						this.setState({ categoryName: res.data.data.categoryName, image: res.data.data.image });
					}
				});
			}
		});
	};

	imageUpload = async () => {
		var formData = new FormData();
		this.state.imgSrc.map(img => {
			formData.append('file', img);
		});
		var data = await axios.post(`http://3.18.139.243:8808/codezeros/uploadMultipleFile/common`, formData);
		return data.data.data;
	};

	onClickToEdit = async e => {
		e.preventDefault();
		this.setState({ isSubmit: true });
		if (this.isValid(this.state)) {
			this.setState({ isSubmit: false });

			let imgSrc = this.state.imgSrc.length > 0 ? await this.imageUpload() : [];
			let obj = {
				categoryName: this.state.categoryName,
				image: [...this.state.image, ...imgSrc],
			};
			this.props.updateCategory(this.props.editId, obj).then(res => {
				if (res.data.code == 400) {
					this.setState({
						errors: { ...this.state.errors, categoryName: res.data.message },
						imgSrc: imgSrc,
						image: this.state.image,
					});
					this.props.getUser();
				} else {
					this.setState({ open: !this.state.open, imgSrc: [], image: [] });
					this.props.getUser();
				}
			});
			const { onClick, editId } = this.props;
		}
	};
	onTextChange(event) {
		if (event.target.value === '') {
			this.setState({ [event.target.name]: event.target.value }, () => {
				if (this.state.isSubmit) {
					this.isValid(this.state);
				}
			});
		} else {
			this.setState({ [event.target.name]: event.target.value }, () => {
				if (this.state.isSubmit) {
					this.isValid(this.state);
				}
			});
		}
	}
	handleselect = event => {
		let value = event.target.value;
		let name = event.target.name;
		this.setState({ [event.target.name]: event.target.value }, () => {
			if (this.state.isSubmit) {
				this.isValid(this.state);
			}
		});
	};

	isValid = data => {
		let { isValid, errors } = validateInput(data);

		this.setState({ isValid, errors });

		return isValid;
	};

	render() {
		let { errors } = this.state;

		let displayImagesPreview = [];
		for (let index = 0; index < this.state.image.length; index++) {
			displayImagesPreview.push(
				<div className="uploadPictureContainer" key={index}>
					<div className="deleteImage" id={[index]} onClick={e => this.delete(e, 'displayImage')}>
						X
					</div>
					<img src={this.state.image[index]} className="uploadPicture" alt="preview" />
				</div>
			);
		}

		return (
			<>
				<IconButton aria-label="Edit" onClick={this.toggle}>
					<EditIcon fontSize="small" />
				</IconButton>
				<Modal isOpen={this.state.open}>
					<ModalHeader toggle={this.toggle}>Edit Category</ModalHeader>
					<ModalBody>
						<Container>
							<Row>
								<Col md="12" lg="12" xl="12">
									<Card className="mx-4">
										<CardBody className="p-4">
											<Form>
												<InputGroup className="mb-12">
													<InputGroup className="mb-12">
														<InputLabel className="labelcss">Category</InputLabel>
													</InputGroup>
													<InputGroupAddon addonType="prepend">
														{/* <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText> */}
													</InputGroupAddon>

													<Input
														type="text"
														name="categoryName"
														value={this.state.categoryName}
														autoComplete="categoryName"
														onChange={this.onTextChange}
													/>
													{errors.categoryName && (
														<em className="has-error">{errors.categoryName}</em>
													)}
												</InputGroup>
												<div className="fileContainer">
													<InputGroup className="mb-12">
														<InputGroup className="mb-12">
															<InputLabel className="labelcss" className="labelcss">
																Display Image
															</InputLabel>
														</InputGroup>
														<InputGroupAddon addonType="prepend" />
														<ImageUploader
															value={this.state.imgSrc}
															withIcon={true}
															buttonText="Choose images"
															onChange={file => {
                                let length = file.length + this.state.image.length
                                if(length > 5) {
                                  this.setState({errors: {...this.state.errors, image: 'You cant add more than 5 image'}}) 
                                } else {
                                  this.setState({ imgSrc: file,  errors: {...this.state.errors, image: ''}});
                                }
															}}
															imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
															maxFileSize={5242880}
															max={5}
															withPreview={true}
														/>
														{errors.image && <em className="has-error">{errors.image}</em>}
													</InputGroup>
													{displayImagesPreview}
												</div>
											</Form>
										</CardBody>
										<CardFooter className="p-12">
											<Row>
												<Button className="editbtncss" color="secondary" onClick={this.toggle}>
													Cancel
												</Button>
												<Button
													color="danger"
													className="editbtncss"
													onClick={this.onClickToEdit}
												>
													Save
												</Button>
											</Row>
										</CardFooter>
									</Card>
								</Col>
							</Row>
						</Container>
					</ModalBody>
				</Modal>
			</>
		);
	}
}
export default connect(
	null,
	{ getOneCategoryData, updateCategory }
)(UpdateCategory);
