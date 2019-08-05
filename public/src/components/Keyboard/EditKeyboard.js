import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	getOneKeyboardDetails,
	updateKeyboardDetails,
	getAllCategory,
	getActiveCatList,
} from '../../action/user.action';
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
import validateInput from '../../shared/Keyboard/KeyboardValidate';
import { withAlert } from 'react-alert';
import SelectSimple from './SelectSimple';
import Select from './Select';
import ImageUploader from 'react-images-upload';
import { componentWillAppendToBody } from 'react-append-to-body';
import axios from 'axios';
import { LoaderAction } from '../../action/loader.action';

class EditKeyboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			keyboardName: '',
			categoryName: '',
			cost: '',
			image: [],
			imgSrc: [],
			displayImg: [],
			displayImage: [],
			subImages: [],
			keyboardType: '',
			errors: {},
			isValid: false,
			isSubmit: false,
			isLogin: true,
			categoryOptions: [],
			keyboardTypeOption: ['free', 'paid'],
			page: 0,
			pageSize: 10,
		};

		this.delete = this.delete.bind(this);
		this.onDrop = this.onDrop.bind(this);
		this.onTextChange = this.onTextChange.bind(this);
		this.onClickToEdit = this.onClickToEdit.bind(this);
		this.handleselect = this.handleselect.bind(this);
	}

	toggle = () => {
		this.setState({ open: !this.state.open }, () => {
			if (this.state.open) {
				this.props.getOneKeyboardDetails(this.props.editId).then(res => {
					if (res.status == 200) {
						this.setState({
							keyboardName: res.data.data.keyboardName,
							categoryName: res.data.data.categoryName,
							keyboardType: res.data.data.keyboardType,
							cost: res.data.data.cost,
							displayImage: res.data.data.displayImage ? res.data.data.displayImage : [],
							subImages: res.data.data.subImages ? res.data.data.subImages : [],
						});
					}
				});
			}
		});

		setTimeout(() => {
			var elements1 = document.getElementsByClassName('uploadPicturesWrapper');

			const d = document.createElement('div', { class: 'custom-preview-image' }, 'dsfdsfdsdsf');
		}, 1000);
	};

	componentWillMount() {
		const { page, pageSize } = this.state;
		this.props.getActiveCatList().then(res => {
			if (res.status == 200) {
				// return false;
				const { data } = res.data;
				const { categoryOptions } = this.state;
				data.map(x => categoryOptions.push({ id: x._id, value: x.categoryName }));
			}
		});
	}

	getContent() {
		return (
			<div className="uploadPictureContainer">
				<div className="deleteImage">X</div>
				<img
					src="http://res.cloudinary.com/yunu121/image/upload/v1547115311/irpwvk0er1mf66wywlnh.jpg"
					className="uploadPicture"
					alt="preview"
				/>
			</div>
		);
	}

	componentDidMount() {}

	onDrop(imageName, file) {
		let displayImg = [];
		if (imageName === 'displayImg') {
			file.map((res, i) => {
				if (i <= 4) {
					displayImg.push(res);
				}
			});
			this.setState({
				[imageName]: displayImg,
			});
		} else {
			this.setState({
				[imageName]: file,
			});
		}
	}

	delete(e, imageName) {
		var array = [...this.state[imageName]];
		array.splice(e.target.id, 1);
		this.setState({ [imageName]: array });
	}

	imageUpload = async nameOfImage => {
		var formData = new FormData();
		this.state[nameOfImage].map(img => {
			formData.append('file', img);
		});
		var data = await axios.post(`http://3.18.139.243:8808/codezeros/uploadMultipleFile/common`, formData);
		return data.data.data;
	};

	onClickToEdit = async e => {
		e.preventDefault();
		this.setState({ isSubmit: true });
		const { imgSrc } = this.state;
		if (this.isValid(this.state)) {
			this.setState({ isSubmit: false });
			let disImg = this.state.displayImg.length > 0 ? await this.imageUpload('displayImg') : [];
			let subImg = this.state.imgSrc.length > 0 ? await this.imageUpload('imgSrc') : [];
			
			this.state.subImages = [...this.state.subImages, ...subImg];
			this.state.displayImage = [...this.state.displayImage, ...disImg];
			await this.props.updateKeyboardDetails(this.props.editId, this.state).then(res => {
				if (res.data.code == 400) {
					this.setState({ errors: { ...this.state.errors, keyboardName: res.data.message } });
				} else {
					this.setState({ open: !this.state.open });
					this.props.getUser();
				}
				this.setState({
					image: [],
					displayImg: [],
					imgSrc: [],
					displayImage: []
				});
			});
		}
		const { onClick, editId } = this.props;
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

	createImage = image => {
		return (
			<div class="uploadPictureContainer" style="">
				<div class="deleteImage">X</div>
				<img src={image} class="uploadPicture" alt="preview" />
			</div>
		);
	};

	render() {
		let { errors } = this.state;

		let subImagesPreview = [];
		for (let index = 0; index < this.state.subImages.length; index++) {
			subImagesPreview.push(
				<div className="uploadPictureContainer" key={index}>
					<div className="deleteImage" id={[index]} onClick={e => this.delete(e, 'subImages')}>
						X
					</div>
					<img src={this.state.subImages[index]} className="uploadPicture" alt="preview" />
				</div>
			);
		}

		let displayImagesPreview = [];
		for (let index = 0; index < this.state.displayImage.length; index++) {
			displayImagesPreview.push(
				<div className="uploadPictureContainer" key={index}>
					<div className="deleteImage" id={[index]} onClick={e => this.delete(e, 'displayImage')}>
						X
					</div>
					<img src={this.state.displayImage[index]} className="uploadPicture" alt="preview" />
				</div>
			);
		}

		return (
			<>
				<IconButton aria-label="Edit" onClick={this.toggle}>
					<EditIcon fontSize="small" />
				</IconButton>
				<Modal isOpen={this.state.open}>
					<ModalHeader toggle={this.toggle}>Edit Keyboard</ModalHeader>
					<ModalBody>
						<Container>
							<Row>
								<Col md="12" lg="12" xl="12">
									<Card className="mx-4">
										<CardBody className="p-4">
											<Form>
												<InputGroup className="mb-12">
													<InputGroup className="mb-12">
														<InputLabel className="labelcss">Name</InputLabel>
													</InputGroup>
													<InputGroupAddon addonType="prepend" />
													<Input
														type="text"
														name="keyboardName"
														autoComplete="Name"
														value={this.state.keyboardName}
														onChange={this.onTextChange}
													/>
													{errors.keyboardName && (
														<em className="has-error">{errors.keyboardName}</em>
													)}
												</InputGroup>
												<InputGroup className="mb-12">
													<InputGroup className="mb-12">
														<InputLabel className="labelcss">Category</InputLabel>
													</InputGroup>
													<InputGroupAddon addonType="prepend" />
													<Select
														name={'categoryName'}
														options={this.state.categoryOptions}
														value={this.state.categoryName}
														placeholder={'Select categoryName'}
														handlechange={this.handleselect}
													/>

													{errors.categoryName && (
														<em className="has-error">{errors.categoryName}</em>
													)}
												</InputGroup>
												<InputGroup className="mb-12">
													<InputGroup className="mb-12">
														<InputLabel className="labelcss" className="labelcss">
															Type
														</InputLabel>
													</InputGroup>
													<InputGroupAddon addonType="prepend" />
													<SelectSimple
														name={'keyboardType'}
														options={this.state.keyboardTypeOption}
														value={this.state.keyboardType}
														placeholder={'Select keyboardType'}
														handlechange={this.handleselect}
													/>
													{/* <Input type="text" name="keyboardType" value={this.state.keyboardType} autoComplete="keyboardType" onChange={this.onTextChange} /> */}
													{errors.keyboardType && (
														<em className="has-error">{errors.keyboardType}</em>
													)}
												</InputGroup>
												<InputGroup className="mb-12">
													<InputGroup className="mb-12">
														<InputLabel className="labelcss">Cost</InputLabel>
													</InputGroup>
													<InputGroupAddon addonType="prepend">
														{/* <InputGroupText>
																<i className="fa fa-volume-control-phone"></i>
															</InputGroupText> */}
													</InputGroupAddon>
													<Input
														type="number"
														name="cost"
														value={this.state.cost}
														autoComplete="cost"
														onChange={this.onTextChange}
														disabled={this.state.keyboardType == 'free'}
													/>
													{errors.cost && <em className="has-error">{errors.cost}</em>}
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
															value={this.state.displayImg}
															withIcon={true}
															buttonText="Choose images"
															onChange={file => this.onDrop('displayImg', file)}
															imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
															maxFileSize={5242880}
															max={5}
															withPreview={true}
														/>
													</InputGroup>
													{displayImagesPreview}
												</div>
												<div className="fileContainer">
													<InputGroup className="mb-12">
														<InputGroup className="mb-12">
															<InputLabel className="labelcss" className="labelcss">
																Sub Image
															</InputLabel>
														</InputGroup>
														<InputGroupAddon addonType="prepend" />
														<ImageUploader
															value={this.state.imgSrc}
															withIcon={true}
															buttonText="Choose images"
															onChange={file => this.onDrop('imgSrc', file)}
															imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
															maxFileSize={5242880}
															withPreview={true}
														/>
													</InputGroup>
													{subImagesPreview}
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
	{ getOneKeyboardDetails, updateKeyboardDetails, getAllCategory, getActiveCatList, LoaderAction }
)(EditKeyboard);
