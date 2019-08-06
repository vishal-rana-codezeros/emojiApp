import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCategory } from '../../action/user.action';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
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
	Form,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Row,
	Container,
	ButtonDropdown,
	DropdownMenu,
	DropdownItem,
	DropdownToggle,
} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import validateInput from '../../shared/Category/CategoryValidate';
import ImageUploader from 'react-images-upload';
import axios from 'axios';

class AddCategory extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			categoryName: '',
			errors: {},
			isValid: false,
			isSubmit: false,
			isLogin: true,
			page: 0,
			pageSize: 10,
			imgSrc: [],
			image: [],
		};

		this.onTextChange = this.onTextChange.bind(this);
		this.onClickToAdd = this.onClickToAdd.bind(this);
	}

	toggle = () => {
		this.setState({ open: !this.state.open }, () => {});
		this.setState({ errors: {} });
	};

	imageUpload = async () => {
		var formData = new FormData();
		this.state.imgSrc.map(img => {
			formData.append('file', img);
		});
		var data = await axios.post(`http://3.18.139.243:8808/codezeros/uploadMultipleFile/common`, formData);
		return data.data.data;
	};

	onClickToAdd = async e => {
		e.preventDefault();
		this.setState({ isSubmit: true });
		if (this.isValid(this.state)) {
			this.setState({ isSubmit: false });
			this.state.image = await this.imageUpload();
			this.props.addCategory(this.state).then(res => {
				this.setState({
					open: !this.state.open,
					categoryName: '',
					imgSrc: [],
					image: [],
				});
				this.props.getUser();
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

	isValid = data => {
		let { isValid, errors } = validateInput(data);

		this.setState({ isValid, errors });

		return isValid;
	};

	render() {
		let { errors } = this.state;

		return (
			<>
				<IconButton aria-label="Edit" className="addButtonCss" onClick={this.toggle}>
					<AddCircleOutline fontSize="large" />
				</IconButton>
				<Modal isOpen={this.state.open}>
					<ModalHeader toggle={this.toggle}>Add Category</ModalHeader>
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
													<InputGroupAddon addonType="prepend" />

													<Input
														type="text"
														name="categoryName"
														value={this.state.categoryName}
														autoComplete="cost"
														onChange={this.onTextChange}
													/>
													{errors.categoryName && (
														<em className="has-error">{errors.categoryName}</em>
													)}
												</InputGroup>
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
                              if(file.length > 5) {
                                this.setState({errors: {...this.state.errors, image: "You cant add more than 5 iamge"}})
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
													onClick={this.onClickToAdd}
												>
													Add
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
	{ addCategory }
)(AddCategory);
